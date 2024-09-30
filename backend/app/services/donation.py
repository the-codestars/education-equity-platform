# app/services/donation.py

import stripe
from app.core.config import settings
from app.core.database import db

stripe.api_key = settings.STRIPE_SECRET_KEY


async def process_donation(amount: int, currency: str, payment_method_id: str, mentor_email: str):
    try:
        # Create a PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method=payment_method_id,
            confirmation_method='manual',
            confirm=True,
        )
        # Record the donation in the database
        await db.donations.insert_one({
            'mentor_email': mentor_email,
            'amount': amount,
            'currency': currency,
            'status': intent.status,
            'payment_intent_id': intent.id
        })
        return intent
    except stripe.error.CardError as e:
        # Handle error
        return None
    except Exception as e:
        # Handle other exceptions
        return None
