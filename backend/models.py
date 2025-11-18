# backend/models.py
from sqlalchemy import Column, Integer, String, Date
from database import Base



class Survey(Base):
    __tablename__ = "surveys"

    id = Column(Integer, primary_key=True, index=True)

    # Using camelCase column names to match the frontend JSON
    firstName = Column(String(100), nullable=False)
    lastName = Column(String(100), nullable=False)
    streetAddress = Column(String(200), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    zip = Column(String(20), nullable=False)
    telephone = Column(String(50), nullable=False)
    email = Column(String(200), nullable=False)

    dateOfSurvey = Column(Date, nullable=False)

    # Comma-separated string in DB; we expose it as List[str] in API
    likedMost = Column(String(300), nullable=True)
    interestSource = Column(String(100), nullable=True)
    likelihood = Column(String(50), nullable=True)
