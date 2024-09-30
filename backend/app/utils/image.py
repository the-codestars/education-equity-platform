# app/utils/image.py

import os
from fastapi import UploadFile, HTTPException
from uuid import uuid4

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 2 * 1024 * 1024  # 2 MB


async def save_profile_image(file: UploadFile) -> str:
    filename = file.filename
    extension = filename.split('.')[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, detail="Invalid file type. Allowed types: png, jpg, jpeg, gif.")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400, detail="File too large. Maximum size allowed is 2 MB.")

    unique_filename = f"{uuid4()}.{extension}"
    file_location = os.path.join(
        "app", "static", "profile_images", unique_filename)

    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_location), exist_ok=True)

    with open(file_location, "wb") as file_object:
        file_object.write(content)

    return f"/static/profile_images/{unique_filename}"
