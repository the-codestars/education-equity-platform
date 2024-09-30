# app/routers/videos.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.video import VideoCreate, VideoResponse
from app.core.database import db
from app.services.auth import get_current_user
from datetime import datetime

router = APIRouter()


@router.post("/", response_model=VideoResponse)
async def share_video(video: VideoCreate, current_user=Depends(get_current_user)):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can share videos")

    video_dict = video.dict()
    video_dict['uploader'] = current_user['email']
    video_dict['uploaded_at'] = datetime.utcnow()
    result = await db.videos.insert_one(video_dict)
    video_dict['id'] = str(result.inserted_id)
    return video_dict


@router.get("/", response_model=list[VideoResponse])
async def get_videos():
    videos = await db.videos.find().to_list(100)
    for video in videos:
        video['id'] = str(video['_id'])
    return videos
