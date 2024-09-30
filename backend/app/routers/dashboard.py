# app/routers/dashboard.py

from fastapi import APIRouter, Depends
from app.core.database import db
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/")
async def get_dashboard_data(current_user=Depends(get_current_user)):
    if current_user['role'] == 'student':
        mentor_matches = await db.matches.count_documents({"student_email": current_user['email']})
        assignments = await db.assignments.count_documents({"assigned_to": current_user['email']})
        posts = await db.posts.count_documents({"author": current_user['email']})
        videos = await db.videos.count_documents({"uploader": current_user['email']})

        data = {
            "mentor_matches": mentor_matches,
            "assignments": assignments,
            "forum_posts": posts,
            "videos_shared": videos,
        }
    elif current_user['role'] == 'mentor':
        assignments_given = await db.assignments.count_documents({"assigned_by": current_user['email']})
        meetings_scheduled = await db.meetings.count_documents({"host_email": current_user['email']})
        donations_received = await db.donations.count_documents({"mentor_email": current_user['email']})
        posts = await db.posts.count_documents({"author": current_user['email']})
        videos_shared = await db.videos.count_documents({"uploader": current_user['email']})

        data = {
            "assignments_given": assignments_given,
            "meetings_scheduled": meetings_scheduled,
            "donations_received": donations_received,
            "forum_posts": posts,
            "videos_shared": videos_shared,
        }
    else:
        data = {}

    return data
