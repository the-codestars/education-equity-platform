# app/routers/mentors.py

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from app.schemas.mentor import MentorUpdate, MentorResponse
from app.core.database import db
from app.services.auth import get_current_user
from app.services.image import save_profile_image

router = APIRouter()


@router.put("/me", response_model=MentorResponse)
async def update_mentor_profile(
    mentor_update: MentorUpdate,
    current_user=Depends(get_current_user)
):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can access this endpoint")

    update_data = mentor_update.dict(exclude_unset=True)
    await db.mentors.update_one(
        {"email": current_user['email']},
        {"$set": update_data}
    )
    updated_profile = await db.mentors.find_one({"email": current_user['email']})
    updated_profile['id'] = str(updated_profile['_id'])
    return updated_profile


@router.put("/me/profile_image")
async def update_profile_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can access this endpoint")

    profile_image_url = await save_profile_image(file)
    # Update in users collection
    await db.users.update_one(
        {"email": current_user['email']},
        {"$set": {"profile_image_url": profile_image_url}}
    )
    # Update in mentors collection
    await db.mentors.update_one(
        {"email": current_user['email']},
        {"$set": {"profile_image_url": profile_image_url}}
    )
    return {"profile_image_url": profile_image_url}


@router.get("/me", response_model=MentorResponse)
async def get_mentor_profile(current_user=Depends(get_current_user)):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can access this endpoint")

    profile = await db.mentors.find_one({"email": current_user['email']})
    if not profile:
        raise HTTPException(status_code=404, detail="Mentor profile not found")
    profile['id'] = str(profile['_id'])
    return profile
