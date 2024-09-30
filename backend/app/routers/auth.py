# app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr
from datetime import date
from typing import Optional
from datetime import datetime

from app.services.auth import authenticate_user, get_current_user
from app.core.security import create_access_token, get_password_hash
from app.core.database import db
from app.services.image import save_profile_image
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register(
    email: EmailStr = Form(...),
    full_name: str = Form(...),
    date_of_birth: date = Form(...),
    bio: Optional[str] = Form(None),
    password: str = Form(...),
    role: str = Form(...),
    file: UploadFile = File(None)
):
    user = UserCreate(
        email=email,
        full_name=full_name,
        date_of_birth=date_of_birth,
        bio=bio,
        password=password,
        role=role
    )

    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    profile_image_url = None
    if file:
        profile_image_url = await save_profile_image(file)
    user_dict = {
        'email': user.email,
        'full_name': user.full_name,
        'date_of_birth': user.date_of_birth.isoformat(),
        'bio': user.bio,
        'hashed_password': hashed_password,
        'role': user.role,
        'profile_image_url': profile_image_url
    }

    result = await db.users.insert_one(user_dict)
    user_dict['id'] = str(result.inserted_id)

    # Create profile in students or mentors collection
    if user.role == 'student':
        await db.students.insert_one({
            'user_id': user_dict['id'],
            'email': user.email,
            'full_name': user.full_name,
            'date_of_birth': user.date_of_birth,
            'interests': [],
            'education_level': '',
            'bio': user.bio,
            'profile_image_url': profile_image_url
        })
    elif user.role == 'mentor':
        await db.mentors.insert_one({
            'user_id': user_dict['id'],
            'email': user.email,
            'full_name': user.full_name,
            'date_of_birth': user.date_of_birth,
            'expertise': [],
            'years_of_experience': 0,
            'education': '',
            'certifications': [],
            'bio': user.bio,
            'profile_image_url': profile_image_url
        })
    else:
        raise HTTPException(status_code=400, detail="Invalid role specified")

    return user_dict


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user['email']})
    return {"access_token": access_token, "token_type": "bearer"}
