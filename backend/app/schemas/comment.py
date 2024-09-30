# app/schemas/comment.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CommentBase(BaseModel):
    content: str


class CommentCreate(CommentBase):
    pass


class CommentResponse(CommentBase):
    id: str
    author: str
    created_at: datetime
    upvotes: int
    downvotes: int

    class Config:
        orm_mode = True
