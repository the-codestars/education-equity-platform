# app/models/comment.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Comment(BaseModel):
    post_id: str
    content: str
    author: str  # Email of the author
    created_at: datetime
    upvotes: int = 0
    downvotes: int = 0
