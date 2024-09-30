# app/routers/forum.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from app.schemas.post import PostCreate, PostResponse
from app.schemas.comment import CommentCreate, CommentResponse
from app.core.database import db
from app.services.auth import get_current_user

router = APIRouter()


@router.post("/posts", response_model=PostResponse)
async def create_post(post: PostCreate, current_user=Depends(get_current_user)):
    post_dict = post.dict()
    post_dict.update({
        'author': current_user['email'],
        'created_at': datetime.utcnow(),
        'upvotes': 0,
        'downvotes': 0,
        'comments': []
    })
    result = await db.posts.insert_one(post_dict)
    post_dict['id'] = str(result.inserted_id)
    return post_dict


@router.get("/posts", response_model=List[PostResponse])
async def get_posts(
    subforum: Optional[str] = None,
    skip: int = 0,
    limit: int = 10
):
    query = {}
    if subforum:
        query['subforum'] = subforum
    posts = await db.posts.find(query).skip(skip).limit(limit).to_list(limit)
    post_responses = []
    for post in posts:
        post['id'] = str(post['_id'])
        comments = await db.comments.find({"post_id": post['id']}).to_list(length=None)
        comment_responses = []
        for comment in comments:
            comment['id'] = str(comment['_id'])
            comment_responses.append(comment)
        post['comments'] = comment_responses
        post_responses.append(post)
    return post_responses


@router.post("/posts/{post_id}/vote")
async def vote_post(
    post_id: str,
    vote: str,  # 'upvote' or 'downvote'
    current_user=Depends(get_current_user)
):
    if vote not in ['upvote', 'downvote']:
        raise HTTPException(status_code=400, detail="Invalid vote type")
    update_field = 'upvotes' if vote == 'upvote' else 'downvotes'
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {update_field: 1}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Vote recorded"}


@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
async def add_comment(
    post_id: str,
    comment: CommentCreate,
    current_user=Depends(get_current_user)
):
    # Verify post exists
    post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment_dict = comment.dict()
    comment_dict.update({
        'post_id': post_id,
        'author': current_user['email'],
        'created_at': datetime.utcnow(),
        'upvotes': 0,
        'downvotes': 0
    })
    result = await db.comments.insert_one(comment_dict)
    comment_dict['id'] = str(result.inserted_id)
    return comment_dict
