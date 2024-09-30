# app/services/meeting.py

from datetime import datetime, timedelta
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from app.core.config import settings
import uuid


async def generate_google_meet_meeting(topic: str, start_time: datetime, duration: int):
    """
    Generates a Google Meet meeting by creating an event in Google Calendar.

    Args:
        topic (str): The title of the meeting.
        start_time (datetime): The start time of the meeting (UTC).
        duration (int): Duration of the meeting in minutes.

    Returns:
        str or None: The Google Meet link if successful, otherwise None.
    """
    # Define the necessary scopes for accessing the Google Calendar API
    SCOPES = ['https://www.googleapis.com/auth/calendar']

    try:
        # Load the credentials from the service account file
        credentials = Credentials.from_service_account_file(
            settings.GOOGLE_SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )

        # If using domain-wide delegation and impersonating a user, uncomment and set the subject
        # credentials = credentials.with_subject('user@example.com')

        # Build the Google Calendar service object
        service = build('calendar', 'v3', credentials=credentials)

        # Calculate the end time of the meeting
        end_time = start_time + timedelta(minutes=duration)

        # Generate a unique requestId using UUID4
        request_id = str(uuid.uuid4())

        # Define the event details for Google Meet meeting
        event = {
            'summary': topic,
            'start': {
                'dateTime': start_time.isoformat(),
                'timeZone': 'UTC',
            },
            'end': {
                'dateTime': end_time.isoformat(),
                'timeZone': 'UTC',
            },
            'conferenceData': {
                'createRequest': {
                    'conferenceSolutionKey': {
                        'type': 'hangoutsMeet'  # Correct type for Google Meet
                    },
                    'requestId': request_id  # Must be unique for each request
                }
            },
            'attendees': [],  # Optional: Add attendees' email addresses if needed
        }

        # Insert the event into the specified Google Calendar and return the Google Meet link
        event = service.events().insert(
            calendarId=settings.GOOGLE_CALENDAR_ID,  # Use the specific calendar ID
            body=event,
            conferenceDataVersion=1
        ).execute()

        # Check if the event has a Google Meet link and return it
        if 'hangoutLink' in event:
            return event['hangoutLink']
        else:
            print("No hangoutLink found in the event.")
            return None

    except HttpError as error:
        # Print the error and response details for debugging
        print(f"An error occurred: {error}")
        try:
            error_content = error.content.decode('utf-8')
            print(f"Error details: {error_content}")
        except Exception:
            print("Could not decode error content.")
        return None
    except Exception as e:
        # Catch any other exceptions
        print(f"An unexpected error occurred: {e}")
        return None
