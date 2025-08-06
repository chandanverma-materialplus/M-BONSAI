from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .... import crud, schemas
from ..deps import get_db, get_current_user_id

router = APIRouter()

@router.get("/{conn_type}", response_model=List[schemas.Connection])
def read_connections(conn_type: str, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Retrieve all connections of a specific type (vector_db, sql_db, crm).
    """
    if conn_type not in ['vector_db', 'sql_db', 'crm']:
        raise HTTPException(status_code=400, detail="Invalid connection type")
    return crud.get_connections(db, user_id=user_id, conn_type=conn_type)

@router.post("/", response_model=schemas.Connection, status_code=201)
def create_connection(connection: schemas.ConnectionBase, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Create a new integration connection.
    """
    return crud.create_connection(db=db, user_id=user_id, connection=connection)
