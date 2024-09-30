# app/core/config.py

import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key"  # Replace with your actual secret key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "educational_platform"
    OPENAI_API_KEY: str = "your-openai-api-key"  # Replace with your OpenAI API key
    # Replace with your Stripe secret key
    STRIPE_SECRET_KEY: str = "your-stripe-secret-key"
    GOOGLE_SERVICE_ACCOUNT_FILE: str = "service_account_credentials.json"
    GOOGLE_CALENDAR_ID:str = "Google Calendar ID"

    class Config:
        env_file = ".env"


settings = Settings()
