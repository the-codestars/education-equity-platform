# app/models/post.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class Post(BaseModel):
    title: str
    content: str
    subforum: str
    author: str  # Email of the author
    created_at: datetime
    upvotes: int = 0
    downvotes: int = 0
    image_url: Optional[str] = None
