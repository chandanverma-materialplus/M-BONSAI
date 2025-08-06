from fastapi import APIRouter, Depends, HTTPException, UploadFile, File as FastAPIFile
from sqlalchemy.orm import Session
from typing import List
from .... import crud, schemas
from ..deps import get_db, get_current_user_id
import os
import shutil

router = APIRouter()
UPLOAD_DIRECTORY = "./uploads"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@router.post("/upload", response_model=schemas.File, status_code=201)
def upload_file(file: UploadFile = FastAPIFile(...), db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Upload a file.
    """
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_data = schemas.FileBase(
        name=file.filename,
        size_bytes=file.size,
        mime_type=file.content_type
    )
    return crud.create_file(db=db, user_id=user_id, file=file_data, storage_path=file_path)

@router.get("/", response_model=List[schemas.File])
def read_files(db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Retrieve all uploaded files for the current user.
    """
    return crud.get_files(db, user_id=user_id)

@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: str, db: Session = Depends(get_db)):
    """
    Delete an uploaded file.
    """
    db_file = crud.delete_file(db, file_id=file_id)
    if db_file is None:
        raise HTTPException(status_code=404, detail="File not found")
    # Also remove from storage
    if os.path.exists(db_file.storage_path):
        os.remove(db_file.storage_path)
    return