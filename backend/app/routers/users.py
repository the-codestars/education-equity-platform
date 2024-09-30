# app/routers/users.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserResponse
from app.core.database import db
from app.services.auth import get_current_user

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user=Depends(get_current_user)):
    user = await db.users.find_one({"email": current_user['email']})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user['id'] = str(user['_id'])
    return user
