# app/schemas/student.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional


class StudentBase(BaseModel):
    email: EmailStr
    full_name: str
    date_of_birth: date
    interests: List[str] = []
    education_level: str = ''
    bio: Optional[str] = None
    profile_image_url: Optional[str] = None


class StudentCreate(StudentBase):
    password: str  # Not typically included in student profile creation


class StudentUpdate(BaseModel):
    interests: Optional[List[str]] = None
    education_level: Optional[str] = None
    bio: Optional[str] = None


class StudentResponse(StudentBase):
    id: str

    class Config:
        orm_mode = True
