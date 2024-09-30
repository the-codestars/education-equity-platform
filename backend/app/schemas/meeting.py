# app/schemas/meeting.py

from pydantic import BaseModel
from datetime import datetime


class MeetingSchedule(BaseModel):
    topic: str
    start_time: datetime
    duration: int  # in minutes


class MeetingResponse(BaseModel):
    id: str
    topic: str
    start_time: datetime
    duration: int
    host_email: str
    meeting_link: str
    created_at: datetime

    class Config:
        orm_mode = True
