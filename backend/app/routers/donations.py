# app/routers/donations.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.donation import DonationCreate, DonationResponse
from app.core.database import db
from app.services.auth import get_current_user
from app.services.donation import process_donation
from app.models.donation import Donation

router = APIRouter()


@router.post("/", response_model=DonationResponse)
async def donate(
    donation: DonationCreate,
    current_user=Depends(get_current_user)
):
    # Ensure the user is authenticated
    if not current_user:
        raise HTTPException(status_code=403, detail="Not authenticated")

    # Verify mentor exists
    mentor = await db.mentors.find_one({"email": donation.mentor_email})
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")

    # Process donation
    intent = await process_donation(
        amount=donation.amount,
        currency=donation.currency,
        payment_method_id=donation.payment_method_id,
        mentor_email=donation.mentor_email
    )

    if not intent:
        raise HTTPException(status_code=400, detail="Donation failed")

    donation_response = DonationResponse(
        id=str(intent.id),
        mentor_email=donation.mentor_email,
        amount=donation.amount,
        currency=donation.currency,
        status=intent.status
    )

    return donation_response
