# app/models/video.py

from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional


class Video(BaseModel):
    title: str
    url: HttpUrl
    description: Optional[str] = None
    uploader: str  # Email of the uploader
    uploaded_at: datetime
