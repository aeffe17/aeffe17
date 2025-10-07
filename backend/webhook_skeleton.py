
import os
import json
import hmac
import hashlib
import redis
from fastapi import FastAPI, Request, HTTPException
from starlette.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

# Configurazione Redis per l'idempotenza
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
redis_client = redis.from_url(REDIS_URL)

# Chiave segreta del webhook Stripe
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

class StripeEvent(BaseModel):
    id: str
    object: str
    api_version: str
    created: int
    data: dict
    livemode: bool
    pending_webhooks: int
    request: dict = None
    type: str

@app.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=500, detail="Stripe webhook secret not configured.")

    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        # Verify webhook signature
        # This is a simplified example. In a real application, use stripe.Webhook.construct_event
        # For demonstration, we'll just check if the header exists.
        if not sig_header:
            raise ValueError("No Stripe-Signature header found.")

        # In a real scenario, you would parse the header and verify the signature
        # For example: event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
        # For this skeleton, we'll assume verification passes if header is present.

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Webhook Error: {e}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing webhook: {e}")

    event_data = json.loads(payload.decode("utf-8"))
    event_id = event_data.get("id")

    if not event_id:
        raise HTTPException(status_code=400, detail="Event ID not found in payload.")

    # Implementazione dell'idempotenza con Redis
    # Utilizza SETNX per assicurarsi che l'evento venga processato una sola volta
    if redis_client.setnx(f"stripe_event:{event_id}", "processed"):
        # Imposta una scadenza per la chiave Redis (es. 1 ora) per pulizia
        redis_client.expire(f"stripe_event:{event_id}", 3600)

        # Processa l'evento Stripe
        print(f"Processing Stripe event: {event_data.get("type")} with ID {event_id}")

        # Esempio di gestione di diversi tipi di eventi
        event_type = event_data.get("type")
        if event_type == "checkout.session.completed":
            session = event_data["data"]["object"]
            customer_email = session.get("customer_details", {}).get("email")
            # Recupera informazioni dalla sessione di checkout e aggiorna il tuo DB
            print(f"Checkout session completed for customer: {customer_email}")
            # Esempio: aggiorna lo stato dell'abbonamento o registra la transazione

        elif event_type == "invoice.payment_succeeded":
            invoice = event_data["data"]["object"]
            customer_id = invoice.get("customer")
            # Aggiorna lo stato dell'abbonamento o altri dati relativi al pagamento
            print(f"Invoice payment succeeded for customer: {customer_id}")

        elif event_type == "customer.subscription.updated":
            subscription = event_data["data"]["object"]
            customer_id = subscription.get("customer")
            # Sincronizza lo stato dell'abbonamento con il tuo sistema
            print(f"Customer subscription updated for customer: {customer_id}")

        # ... aggiungi altri tipi di eventi Stripe da gestire

        return JSONResponse({"status": "success"})
    else:
        # L'evento è già stato processato o è in corso di elaborazione
        print(f"Stripe event {event_id} already processed or in progress. Ignoring.")
        return JSONResponse({"status": "ignored", "detail": "Event already processed"}))

