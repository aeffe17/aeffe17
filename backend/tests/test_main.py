from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 404 # Assuming no root endpoint, or a 404 for unhandled routes

def test_register_user():
    response = client.post(
        "/api/auth",
        json={
            "email": "test@example.com",
            "password": "password123",
            "name": "Test User"
        },
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_user():
    # First, register a user
    client.post(
        "/api/auth",
        json={
            "email": "login@example.com",
            "password": "password123",
            "name": "Login User"
        },
    )
    
    response = client.post(
        "/api/auth/login",
        data={
            "username": "login@example.com",
            "password": "password123"
        },
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_create_property():
    # Assuming a logged-in user (token would be dynamic in a real test suite)
    # For simplicity, we'll use a placeholder token and assume get_current_user works
    response = client.post(
        "/api/properties",
        headers={
            "Authorization": "Bearer fake-jwt-token"
        },
        json={
            "title": "Beautiful Villa",
            "description": "A stunning villa with lake view.",
            "price": 1200000.00,
            "city": "Riva del Garda",
            "sqm": 200,
            "rooms": 5
        },
    )
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["title"] == "Beautiful Villa"

def test_get_properties():
    response = client.get(
        "/api/properties",
        headers={
            "Authorization": "Bearer fake-jwt-token"
        }
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_record_visit():
    response = client.post(
        "/api/metrics/visit",
        json={
            "page": "/",
            "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Visit recorded"}

def test_get_visitors_count():
    response = client.get("/api/metrics/visitors")
    assert response.status_code == 200
    assert "total_visitors" in response.json()

