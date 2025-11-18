# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import database
import models
import schemas
import crud
from database import get_db, engine
from models import Base

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Survey API")

# CORS so React at localhost:3000 can call this API
origins = [
    "*",  # allow all for now (safe enough for homework)
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Student Survey API is running"}


@app.get("/api/surveys", response_model=List[schemas.SurveyOut])
def list_surveys(db: Session = Depends(get_db)):
    return crud.get_surveys(db)


@app.post(
    "/api/surveys",
    response_model=schemas.SurveyOut,
    status_code=status.HTTP_201_CREATED,
)
def create_survey(
    survey: schemas.SurveyCreate,
    db: Session = Depends(get_db),
):
    return crud.create_survey(db, survey)


@app.put("/api/surveys/{survey_id}", response_model=schemas.SurveyOut)
def update_survey_endpoint(
    survey_id: int,
    survey: schemas.SurveyUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_survey(db, survey_id, survey)
    if not updated:
        raise HTTPException(status_code=404, detail="Survey not found")
    return updated


@app.delete("/api/surveys/{survey_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_survey_endpoint(
    survey_id: int,
    db: Session = Depends(get_db),
):
    ok = crud.delete_survey(db, survey_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Survey not found")
    return
