# app/routers/matching.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.matching import match_mentors
from app.core.database import db
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/mentors")
async def get_matched_mentors(current_user=Depends(get_current_user)):
    # Ensure the user is a student
    if current_user['role'] != 'student':
        raise HTTPException(
            status_code=403, detail="Only students can access this endpoint")

    student_profile = await db.students.find_one({"email": current_user['email']})
    if not student_profile:
        raise HTTPException(
            status_code=404, detail="Student profile not found")
    mentors = await match_mentors(student_profile)
    return {"recommended_mentors": mentors}
