# app/services/scholarship.py

import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY


async def get_scholarship_guidance(student_profile):
    prompt = f"""
    You are an AI assistant that provides scholarship recommendations for students based on their profile.

    Student profile:
    - Full Name: {student_profile['full_name']}
    - Interests: {', '.join(student_profile['interests'])}
    - Education Level: {student_profile['education_level']}

    List the top scholarships that this student should apply for, including brief descriptions.
    """

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=200,
        n=1,
        stop=None,
        temperature=0.7,
    )

    scholarships = response.choices[0].text.strip()
    return scholarships
