from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .... import crud, schemas
from ..deps import get_db, get_current_user_id

router = APIRouter()

@router.get("/", response_model=List[schemas.Agent])
def read_agents(db: Session = Depends(get_db)):
    """
    Retrieve all agents (system and custom).
    """
    agents = crud.get_agents(db)
    return agents

@router.post("/", response_model=schemas.Agent, status_code=201)
def create_agent(agent: schemas.AgentCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Create a new custom agent.
    """
    agent.created_by = user_id
    agent.is_custom = True
    return crud.create_agent(db=db, agent=agent)

@router.put("/{agent_id}", response_model=schemas.Agent)
def update_agent(agent_id: str, agent_update: schemas.AgentCreate, db: Session = Depends(get_db)):
    """
    Update an existing custom agent.
    """
    db_agent = crud.get_agent(db, agent_id)
    if not db_agent or not db_agent.is_custom:
        raise HTTPException(status_code=404, detail="Custom agent not found")
    return crud.update_agent(db, agent_id, agent_update)

@router.delete("/{agent_id}", status_code=204)
def delete_agent(agent_id: str, db: Session = Depends(get_db)):
    """
    Delete a custom agent.
    """
    db_agent = crud.get_agent(db, agent_id)
    if not db_agent or not db_agent.is_custom:
        raise HTTPException(status_code=404, detail="Custom agent not found")
    crud.delete_agent(db, agent_id)
    return