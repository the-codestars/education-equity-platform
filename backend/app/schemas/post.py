# app/schemas/post.py

from app.schemas.comment import CommentResponse
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class PostBase(BaseModel):
    title: str
    content: str
    subforum: str
    image_url: Optional[str] = None


class PostCreate(PostBase):
    pass


class PostResponse(PostBase):
    id: str
    author: str
    created_at: datetime
    upvotes: int
    downvotes: int
    comments: List['CommentResponse'] = []

    class Config:
        orm_mode = True


# To handle forward references
PostResponse.update_forward_refs()
