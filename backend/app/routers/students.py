from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from app.schemas.student import StudentUpdate, StudentResponse
from app.core.database import db
from app.services.auth import get_current_user
from app.services.image import save_profile_image
from bson import ObjectId

router = APIRouter()


@router.put("/me", response_model=StudentResponse)
async def update_student_profile(
    student_update: StudentUpdate,
    current_user=Depends(get_current_user)
):
    # Ensure the user is a student
    if current_user['role'] != 'student':
        raise HTTPException(
            status_code=403, detail="Only students can access this endpoint")

    # Check if the student profile exists
    student_profile = await db.students.find_one({"email": current_user['email']})

    # If no student profile exists, fetch the user data and create a new student
    if not student_profile:
        user_data = await db.users.find_one({"email": current_user['email']})
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found")
        # Copy all details from user_data, ensuring the _id is a new ObjectId
        user_data['_id'] = ObjectId()  # Ensure the student has a new unique ID
        await db.students.insert_one(user_data)
        student_profile = user_data

    # Update the student profile with the new data
    update_data = student_update.dict(exclude_unset=True)
    await db.students.update_one(
        {"email": current_user['email']},
        {"$set": update_data}
    )

    updated_profile = await db.students.find_one({"email": current_user['email']})
    if not updated_profile:
        raise HTTPException(
            status_code=404, detail="Student profile not found")

    updated_profile['id'] = str(updated_profile['_id'])
    return updated_profile


@router.put("/me/profile_image")
async def update_profile_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    # Ensure the user is a student
    if current_user['role'] != 'student':
        raise HTTPException(
            status_code=403, detail="Only students can access this endpoint")

    profile_image_url = await save_profile_image(file)

    # Check if the student profile exists
    student_profile = await db.students.find_one({"email": current_user['email']})

    # If no student profile exists, fetch the user data and create a new student
    if not student_profile:
        user_data = await db.users.find_one({"email": current_user['email']})
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found")
        # Copy all details from user_data, ensuring the _id is a new ObjectId
        user_data['_id'] = ObjectId()  # Ensure the student has a new unique ID
        await db.students.insert_one(user_data)

    # Update the profile image in both users and students collections
    await db.users.update_one(
        {"email": current_user['email']},
        {"$set": {"profile_image_url": profile_image_url}}
    )

    await db.students.update_one(
        {"email": current_user['email']},
        {"$set": {"profile_image_url": profile_image_url}}
    )

    return {"profile_image_url": profile_image_url}


@router.get("/me", response_model=StudentResponse)
async def get_student_profile(current_user=Depends(get_current_user)):
    # Ensure the user is a student
    if current_user['role'] != 'student':
        raise HTTPException(
            status_code=403, detail="Only students can access this endpoint")

    profile = await db.students.find_one({"email": current_user['email']})

    # If no profile exists, fetch the user data and create a new student profile
    if not profile:
        user_data = await db.users.find_one({"email": current_user['email']})
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found")
        # Copy all details from user_data, ensuring the _id is a new ObjectId
        user_data['_id'] = ObjectId()  # Ensure the student has a new unique ID
        await db.students.insert_one(user_data)
        profile = user_data

    profile['id'] = str(profile['_id'])
    return profile
