# app/schemas/video.py

from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional


class VideoCreate(BaseModel):
    title: str
    url: HttpUrl
    description: Optional[str] = None


class VideoResponse(VideoCreate):
    id: str
    uploader: str
    uploaded_at: datetime

    class Config:
        orm_mode = True
