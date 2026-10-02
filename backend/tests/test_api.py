from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "OPERATIONAL"


def test_login_success():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "Admingis@gmail.com", "password": "GIS@admin123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "admin"


def test_login_invalid():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "invalid@greenfieldis.edu", "password": "wrongpassword"},
    )
    assert response.status_code == 401
