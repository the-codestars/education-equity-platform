# app/models/assignment.py

from pydantic import BaseModel
from datetime import datetime


class Assignment(BaseModel):
    title: str
    description: str
    due_date: datetime
    assigned_to: str  # Email of the student
    assigned_by: str  # Email of the mentor
    created_at: datetime
