# app/models/user.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class User(BaseModel):
    email: EmailStr
    full_name: str
    date_of_birth: date
    bio: Optional[str] = None
    hashed_password: str
    role: str  # 'student' or 'mentor'
    profile_image_url: Optional[str] = None
