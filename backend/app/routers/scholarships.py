# app/routers/scholarships.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.scholarship import get_scholarship_guidance
from app.core.database import db
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/guidance")
async def scholarship_guidance(current_user=Depends(get_current_user)):
    # Ensure the user is a student
    if current_user['role'] != 'student':
        raise HTTPException(
            status_code=403, detail="Only students can access this endpoint")

    student_profile = await db.students.find_one({"email": current_user['email']})
    if not student_profile:
        raise HTTPException(
            status_code=404, detail="Student profile not found")
    guidance = await get_scholarship_guidance(student_profile)
    return {"scholarship_recommendations": guidance}
