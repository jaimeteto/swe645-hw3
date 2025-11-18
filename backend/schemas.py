# backend/schemas.py
from datetime import date
from typing import List, Optional

from pydantic import BaseModel, EmailStr


class SurveyBase(BaseModel):
    firstName: str
    lastName: str
    streetAddress: str
    city: str
    state: str
    zip: str
    telephone: str
    email: EmailStr
    dateOfSurvey: date
    likedMost: List[str]
    interestSource: str
    likelihood: str


class SurveyCreate(SurveyBase):
    pass


class SurveyUpdate(SurveyBase):
    pass


class SurveyOut(SurveyBase):
    id: int

