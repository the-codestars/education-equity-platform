# app/routers/assignments.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.assignment import AssignmentCreate, AssignmentResponse
from app.core.database import db
from app.services.auth import get_current_user
from datetime import datetime

router = APIRouter()


@router.post("/", response_model=AssignmentResponse)
async def create_assignment(assignment: AssignmentCreate, current_user=Depends(get_current_user)):
    # Ensure the user is a mentor
    if current_user['role'] != 'mentor':
        raise HTTPException(
            status_code=403, detail="Only mentors can assign assignments")

    # Verify that the student exists
    student = await db.students.find_one({"email": assignment.assigned_to})
    if not student:
        raise HTTPException(
            status_code=404, detail="Assigned student not found")

    assignment_dict = assignment.dict()
    assignment_dict['assigned_by'] = current_user['email']
    assignment_dict['created_at'] = datetime.utcnow()
    result = await db.assignments.insert_one(assignment_dict)
    assignment_dict['id'] = str(result.inserted_id)
    return assignment_dict


@router.get("/", response_model=list[AssignmentResponse])
async def get_assignments(current_user=Depends(get_current_user)):
    # Fetch assignments assigned to the current user
    assignments = await db.assignments.find({"assigned_to": current_user['email']}).to_list(100)
    for assignment in assignments:
        assignment['id'] = str(assignment['_id'])
    return assignments
