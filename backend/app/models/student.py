# app/models/student.py

from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional


class Student(BaseModel):
    user_id: str
    email: EmailStr
    full_name: str
    date_of_birth: date
    interests: List[str] = []
    education_level: str = ''
    bio: Optional[str] = None
    profile_image_url: Optional[str] = None
