# app/services/image.py

import os
from fastapi import UploadFile, HTTPException
from uuid import uuid4

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 2 * 1024 * 1024  # 2 MB


async def save_profile_image(file: UploadFile) -> str:
    filename = file.filename
    extension = filename.split('.')[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Invalid file type")
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    filename = f"{uuid4()}.{extension}"
    file_location = f"app/static/profile_images/{filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    with open(file_location, "wb+") as file_object:
        file_object.write(content)
    return f"/static/profile_images/{filename}"
