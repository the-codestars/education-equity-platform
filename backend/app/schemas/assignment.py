# app/schemas/assignment.py

from pydantic import BaseModel
from datetime import datetime


class AssignmentCreate(BaseModel):
    title: str
    description: str
    due_date: datetime
    assigned_to: str  # Email of the student


class AssignmentResponse(AssignmentCreate):
    id: str
    assigned_by: str
    created_at: datetime

    class Config:
        orm_mode = True
