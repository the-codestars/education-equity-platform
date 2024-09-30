# app/models/donation.py

from pydantic import BaseModel
from typing import Optional


class Donation(BaseModel):
    mentor_email: str
    amount: int  # Amount in cents
    currency: str = "usd"
    payment_method_id: str
    status: str  # e.g., 'succeeded', 'failed'
