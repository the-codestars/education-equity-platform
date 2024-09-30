# app/main.py

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import (
    auth, users, students, mentors, matching, scholarships, meetings,
    forum, videos, dashboard, assignments, donations
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Educational Platform API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(students.router, prefix="/students", tags=["Students"])
app.include_router(mentors.router, prefix="/mentors", tags=["Mentors"])
app.include_router(matching.router, prefix="/matching",
                   tags=["Mentor Matching"])
app.include_router(scholarships.router,
                   prefix="/scholarships", tags=["Scholarships"])
app.include_router(meetings.router, prefix="/meetings", tags=["Meetings"])
app.include_router(forum.router, prefix="/forum", tags=["Forum"])
app.include_router(videos.router, prefix="/videos", tags=["Videos"])
app.include_router(assignments.router,
                   prefix="/assignments", tags=["Assignments"])
app.include_router(donations.router, prefix="/donations", tags=["Donations"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
