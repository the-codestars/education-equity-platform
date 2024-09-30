# app/models/mentor.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional


class Mentor(BaseModel):
    user_id: str
    email: EmailStr
    full_name: str
    date_of_birth: date
    expertise: List[str] = []
    bio: str = ''
    years_of_experience: int = 0
    education: str = ''
    certifications: Optional[List[str]] = []
    profile_image_url: Optional[str] = None
