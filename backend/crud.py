# backend/crud.py
from typing import List, Optional
from sqlalchemy.orm import Session

import models
import schemas



def _list_to_comma_str(items: List[str]) -> str:
    return ",".join(items) if items else ""


def _comma_str_to_list(value: Optional[str]) -> List[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def get_surveys(db: Session) -> List[schemas.SurveyOut]:
    surveys = db.query(models.Survey).all()
    result: List[schemas.SurveyOut] = []
    for s in surveys:
        result.append(
            schemas.SurveyOut(
                id=s.id,
                firstName=s.firstName,
                lastName=s.lastName,
                streetAddress=s.streetAddress,
                city=s.city,
                state=s.state,
                zip=s.zip,
                telephone=s.telephone,
                email=s.email,
                dateOfSurvey=s.dateOfSurvey,
                likedMost=_comma_str_to_list(s.likedMost),
                interestSource=s.interestSource or "",
                likelihood=s.likelihood or "",
            )
        )
    return result


def create_survey(db: Session, survey_in: schemas.SurveyCreate) -> schemas.SurveyOut:
    db_obj = models.Survey(
        firstName=survey_in.firstName,
        lastName=survey_in.lastName,
        streetAddress=survey_in.streetAddress,
        city=survey_in.city,
        state=survey_in.state,
        zip=survey_in.zip,
        telephone=survey_in.telephone,
        email=survey_in.email,
        dateOfSurvey=survey_in.dateOfSurvey,
        likedMost=_list_to_comma_str(survey_in.likedMost),
        interestSource=survey_in.interestSource,
        likelihood=survey_in.likelihood,
    )

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return schemas.SurveyOut(
        id=db_obj.id,
        firstName=db_obj.firstName,
        lastName=db_obj.lastName,
        streetAddress=db_obj.streetAddress,
        city=db_obj.city,
        state=db_obj.state,
        zip=db_obj.zip,
        telephone=db_obj.telephone,
        email=db_obj.email,
        dateOfSurvey=db_obj.dateOfSurvey,
        likedMost=_comma_str_to_list(db_obj.likedMost),
        interestSource=db_obj.interestSource or "",
        likelihood=db_obj.likelihood or "",
    )


def get_survey(db: Session, survey_id: int) -> Optional[schemas.SurveyOut]:
    s = db.query(models.Survey).filter(models.Survey.id == survey_id).first()
    if not s:
        return None
    return schemas.SurveyOut(
        id=s.id,
        firstName=s.firstName,
        lastName=s.lastName,
        streetAddress=s.streetAddress,
        city=s.city,
        state=s.state,
        zip=s.zip,
        telephone=s.telephone,
        email=s.email,
        dateOfSurvey=s.dateOfSurvey,
        likedMost=_comma_str_to_list(s.likedMost),
        interestSource=s.interestSource or "",
        likelihood=s.likelihood or "",
    )


def update_survey(
    db: Session, survey_id: int, survey_in: schemas.SurveyUpdate
) -> Optional[schemas.SurveyOut]:
    s = db.query(models.Survey).filter(models.Survey.id == survey_id).first()
    if not s:
        return None

    s.firstName = survey_in.firstName
    s.lastName = survey_in.lastName
    s.streetAddress = survey_in.streetAddress
    s.city = survey_in.city
    s.state = survey_in.state
    s.zip = survey_in.zip
    s.telephone = survey_in.telephone
    s.email = survey_in.email
    s.dateOfSurvey = survey_in.dateOfSurvey
    s.likedMost = _list_to_comma_str(survey_in.likedMost)
    s.interestSource = survey_in.interestSource
    s.likelihood = survey_in.likelihood

    db.commit()
    db.refresh(s)

    return schemas.SurveyOut(
        id=s.id,
        firstName=s.firstName,
        lastName=s.lastName,
        streetAddress=s.streetAddress,
        city=s.city,
        state=s.state,
        zip=s.zip,
        telephone=s.telephone,
        email=s.email,
        dateOfSurvey=s.dateOfSurvey,
        likedMost=_comma_str_to_list(s.likedMost),
        interestSource=s.interestSource or "",
        likelihood=s.likelihood or "",
    )


def delete_survey(db: Session, survey_id: int) -> bool:
    s = db.query(models.Survey).filter(models.Survey.id == survey_id).first()
    if not s:
        return False
    db.delete(s)
    db.commit()
    return True
