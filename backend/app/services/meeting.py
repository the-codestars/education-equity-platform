# app/services/meeting.py

import requests
from datetime import datetime
from app.core.config import settings


async def generate_zoom_meeting(topic: str, start_time: datetime, duration: int):
    zoom_api_url = "https://api.zoom.us/v2/users/me/meetings"
    zoom_jwt_token = settings.ZOOM_JWT_TOKEN  # Add ZOOM_JWT_TOKEN to your .env

    headers = {
        "Authorization": f"Bearer {zoom_jwt_token}",
        "Content-Type": "application/json"
    }

    meeting_details = {
        "topic": topic,
        "type": 2,  # Scheduled meeting
        "start_time": start_time.isoformat(),
        "duration": duration,
        "timezone": "UTC",
        "settings": {
            "join_before_host": True,
            "participant_video": True,
            "host_video": True,
            "mute_upon_entry": False,
            "waiting_room": False
        }
    }

    response = requests.post(
        zoom_api_url, headers=headers, json=meeting_details)
    if response.status_code == 201:
        return response.json()['join_url']
    else:
        return None
