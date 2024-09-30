# app/models/meeting.py

from pydantic import BaseModel
from datetime import datetime


class Meeting(BaseModel):
    topic: str
    start_time: datetime
    duration: int  # in minutes
    host_email: str  # Mentor's email
    meeting_link: str
    created_at: datetime
