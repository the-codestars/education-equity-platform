# app/schemas/mentor.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional


class MentorBase(BaseModel):
    email: EmailStr
    full_name: str
    date_of_birth: date
    expertise: List[str] = []
    bio: str = ''
    years_of_experience: int = 0
    education: str = ''
    certifications: Optional[List[str]] = []
    profile_image_url: Optional[str] = None


class MentorCreate(MentorBase):
    password: str  # Not typically included in mentor profile creation


class MentorUpdate(BaseModel):
    expertise: Optional[List[str]] = None
    years_of_experience: Optional[int] = None
    education: Optional[str] = None
    certifications: Optional[List[str]] = None
    bio: Optional[str] = None


class MentorResponse(MentorBase):
    id: str

    class Config:
        orm_mode = True
