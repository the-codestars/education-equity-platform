# app/schemas/donation.py

from pydantic import BaseModel
from typing import Optional


class DonationCreate(BaseModel):
    mentor_email: str
    amount: int  # Amount in cents
    currency: str = "usd"
    payment_method_id: str


class DonationResponse(BaseModel):
    id: str
    mentor_email: str
    amount: int
    currency: str
    status: str

    class Config:
        orm_mode = True
