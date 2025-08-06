from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .... import crud, schemas
from ..deps import get_db, get_current_user_id
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[schemas.Session])
def read_sessions(db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Retrieve recent sessions for the current user.
    """
    return crud.get_sessions(db, user_id=user_id)

@router.post("/", response_model=schemas.Session, status_code=201)
def create_session(session: schemas.SessionBase, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Create a new chat session.
    """
    return crud.create_session(db=db, user_id=user_id, session=session)

@router.get("/{session_id}", response_model=schemas.SessionDetail)
def read_session_details(session_id: str, db: Session = Depends(get_db)):
    """
    Retrieve the details of a specific session, including messages.
    """
    db_session = crud.get_session(db, session_id=session_id)
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    db_session.messages = crud.get_messages_for_session(db, session_id)
    return db_session

@router.post("/{session_id}/messages", response_model=schemas.Message)
def send_message(session_id: str, message: schemas.MessageBase, db: Session = Depends(get_db)):
    """
    Send a message from the user to a session.
    This would trigger agent responses in a real application.
    """
    # For now, just save the user's message.
    return crud.create_message(db=db, session_id=session_id, content=message.content, sender_type='user')
