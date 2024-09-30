# app/schemas/user.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    date_of_birth: date
    bio: Optional[str] = None
    profile_image_url: Optional[str] = None


class UserCreate(UserBase):
    password: str
    role: str  # 'student' or 'mentor'


class UserResponse(UserBase):
    id: str
    role: str

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    email: Optional[EmailStr] = None
