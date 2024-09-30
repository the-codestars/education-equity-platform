# app/routers/meetings.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.meeting import MeetingSchedule, MeetingResponse
from app.core.database import db
from app.services.auth import get_current_user
from app.services.meeting import generate_zoom_meeting
from datetime import datetime

router = APIRouter()


@router.post("/schedule", response_model=MeetingResponse)
async def schedule_meeting(
    meeting: MeetingSchedule,
    current_user=Depends(get_current_user)
):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can schedule meetings")

    # Generate meeting link
    meeting_link = await generate_zoom_meeting(
        topic=meeting.topic,
        start_time=meeting.start_time,
        duration=meeting.duration
    )
    if not meeting_link:
        raise HTTPException(status_code=500, detail="Failed to create meeting")

    meeting_dict = meeting.dict()
    meeting_dict['host_email'] = current_user['email']
    meeting_dict['meeting_link'] = meeting_link
    meeting_dict['created_at'] = datetime.utcnow()

    result = await db.meetings.insert_one(meeting_dict)
    meeting_dict['id'] = str(result.inserted_id)
    return meeting_dict
