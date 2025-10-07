
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import redis
import os
import uuid
from datetime import datetime

app = FastAPI()

# Configurazione Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
redis_client = redis.from_url(REDIS_URL)

# OAuth2 per l'autenticazione
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Modelli Pydantic
class UserCreate(BaseModel:
    email: str
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel:
    email: str
    password: str

class Token(BaseModel:
    access_token: str
    token_type: str

class PropertyBase(BaseModel:
    title: str
    description: str
    price: float
    city: str
    sqm: int
    rooms: int
    lat: Optional[float] = None
    lon: Optional[float] = None

class PropertyCreate(PropertyBase:
    pass

class Property(PropertyBase:
    id: uuid.UUID
    user_id: uuid.UUID
    images: List[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class CheckoutRequest(BaseModel:
    item_id: str
    item_type: str # e.g., 'publish_ad', 'chat_session'
    user_id: uuid.UUID

class WebhookEvent(BaseModel:
    id: str
    type: str
    data: dict

class VisitMetric(BaseModel:
    page: str
    user_id: Optional[uuid.UUID] = None

# Placeholder per il database (sostituire con un ORM reale come SQLAlchemy)
fake_users_db = {}
fake_properties_db = {}
fake_visitors_count = 0

# Dipendenza per l'utente corrente (placeholder)
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Qui andrebbe la logica per decodificare il token e recuperare l'utente
    # Per ora, restituiamo un utente fittizio
    return {"email": "test@example.com", "id": uuid.uuid4(), "role": "premium"}

# API Endpoints

@app.post("/api/auth", response_model=Token)
async def register(user: UserCreate):
    # Logica di registrazione utente
    if user.email in fake_users_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    fake_users_db[user.email] = {"password": user.password, "name": user.name, "id": uuid.uuid4(), "role": "visitor"}
    # Genera un token JWT reale qui
    return {"access_token": "fake-jwt-token", "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Logica di login utente
    user = fake_users_db.get(form_data.username)
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    # Genera un token JWT reale qui
    return {"access_token": "fake-jwt-token", "token_type": "bearer"}

@app.get("/api/properties", response_model=List[Property])
async def get_properties(current_user: dict = Depends(get_current_user)):
    # Recupera tutte le proprietà o filtra per utente/criteri
    return list(fake_properties_db.values())

@app.get("/api/properties/{property_id}", response_model=Property)
async def get_property(property_id: uuid.UUID, current_user: dict = Depends(get_current_user)):
    property_data = fake_properties_db.get(property_id)
    if not property_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return property_data

@app.post("/api/properties", response_model=Property, status_code=status.HTTP_201_CREATED)
async def create_property(property: PropertyCreate, current_user: dict = Depends(get_current_user)):
    new_property_id = uuid.uuid4()
    new_property = Property(
        id=new_property_id,
        user_id=current_user["id"],
        images=[],
        status="draft",
        created_at=datetime.now(),
        **property.model_dump()
    )
    fake_properties_db[new_property_id] = new_property
    return new_property

@app.post("/api/checkout")
async def checkout(request: CheckoutRequest, current_user: dict = Depends(get_current_user)):
    # Logica per avviare il processo di checkout Stripe
    # Qui si dovrebbe creare una sessione di checkout Stripe e restituire l'URL
    stripe_links = {
        "basic_subscription": "https://buy.stripe.com/aFa3co0111xTgQOeAE7g408",
        "premium_subscription": "https://buy.stripe.com/14A6oAdRR3G16ca3W07g40a",
        "chat_session": "https://buy.stripe.com/8x214g7tt1xTeIGeAE7g407",
        "publish_ad": "https://buy.stripe.com/00weV64hhb8tbwubos7g405"
    }

    checkout_url = stripe_links.get(request.item_type)

    if not checkout_url:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid item_type for checkout")

    # In un'applicazione reale, qui si potrebbero aggiungere logiche per:
    # - Verificare i permessi dell'utente (es. Basic può comprare Publish e Chat)
    # - Creare una sessione di checkout Stripe personalizzata se necessario
    # - Salvare lo stato della transazione nel DB prima di reindirizzare

    print(f"Checkout request for {request.item_type} by user {current_user['id']}. Redirecting to {checkout_url}")
    return {"message": "Checkout initiated", "checkout_url": checkout_url}

@app.post("/api/webhook/stripe")
async def stripe_webhook(event: WebhookEvent):
    # Implementazione dell'idempotenza con Redis
    event_id = event.id
    if redis_client.setnx(f"stripe_event:{event_id}", "processed"):
        redis_client.expire(f"stripe_event:{event_id}", 3600) # Scade dopo 1 ora
        # Processa l'evento Stripe
        print(f"Processing Stripe event: {event.type} with ID {event_id}")
        # Esempio: aggiornare lo stato dell'abbonamento o della transazione
        if event.type == "checkout.session.completed":
            print("Checkout session completed!")
        # ... altre logiche per diversi tipi di eventi
        return {"status": "success"}
    else:
        print(f"Stripe event {event_id} already processed or in progress.")
        return {"status": "ignored", "detail": "Event already processed"}

@app.post("/api/metrics/visit")
async def record_visit(metric: VisitMetric):
    global fake_visitors_count
    # Implementazione del contatore visitatori con Redis per l'idempotenza
    # Non conteggia reload ripetuti entro 24h
    user_id_or_ip = metric.user_id if metric.user_id else "anonymous_" + str(uuid.uuid4())
    key = f"visit:{user_id_or_ip}:{metric.page}"
    if redis_client.setnx(key, "visited"):
        redis_client.expire(key, 86400) # Scade dopo 24 ore
        fake_visitors_count += 1 # Incrementa solo se è una nuova visita
        print(f"New visit recorded for {metric.page} by {user_id_or_ip}. Total visitors: {fake_visitors_count}")
    else:
        print(f"Visit for {metric.page} by {user_id_or_ip} already counted within 24h.")
    return {"message": "Visit recorded"}

@app.get("/api/metrics/visitors")
async def get_visitors_count():
    return {"total_visitors": fake_visitors_count}


