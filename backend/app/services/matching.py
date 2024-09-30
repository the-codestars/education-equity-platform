# app/services/matching.py

import openai
from app.core.config import settings
from app.core.database import db

openai.api_key = settings.OPENAI_API_KEY


async def match_mentors(student_profile):
    mentors = await db.mentors.find().to_list(length=None)
    if not mentors:
        return []

    mentor_details = "\n".join([
        f"- {mentor['full_name']} (Expertise: {', '.join(mentor['expertise'])})"
        for mentor in mentors
    ])

    prompt = f"""
    You are an AI assistant that matches students with mentors based on their interests and mentors' expertise.

    Student interests: {', '.join(student_profile['interests'])}

    Available mentors:
    {mentor_details}

    Based on the student's interests, recommend the top 3 suitable mentors.
    """

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )

    recommended = response.choices[0].text.strip()
    recommended_mentors = [mentor.strip()
                           for mentor in recommended.split('\n') if mentor.strip()]
    return recommended_mentors[:3]
