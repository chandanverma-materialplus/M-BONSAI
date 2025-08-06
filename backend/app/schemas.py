from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any
from datetime import datetime
import uuid

# Base Schemas (for creation)
class AgentBase(BaseModel):
    id: str = Field(..., description="A unique identifier for the agent, e.g., 'ocr' or 'custom-123'")
    name: str
    description: Optional[str] = None
    avatar: Optional[str] = None
    model: Optional[str] = "gpt-4-turbo"
    specialty: Optional[str] = None
    task: Optional[str] = None
    api_access: List[str] = []
    mcp_servers: List[Any] = []
    is_custom: bool = False

class AgentCreate(AgentBase):
    created_by: Optional[str] = None # User ID

class SessionBase(BaseModel):
    name: str

class MessageBase(BaseModel):
    content: str

class FileBase(BaseModel):
    name: str
    size_bytes: int
    mime_type: str

class ConnectionBase(BaseModel):
    name: str
    type: str
    provider: str
    credentials: dict

# Response Schemas (for reading data)
class Agent(AgentBase):
    created_at: datetime
    
    class Config:
        from_attributes = True

class Message(BaseModel):
    id: int
    content: str
    sender_type: str
    agent_id: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class Session(SessionBase):
    id: str
    user_id: str
    last_active: datetime
    created_at: datetime

    class Config:
        from_attributes = True
        
class SessionDetail(Session):
    messages: List[Message] = []

class File(FileBase):
    id: str
    user_id: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

class Connection(ConnectionBase):
    id: str
    user_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    plan: str
    avatar_url: Optional[str] = None
    
    class Config:
        from_attributes = True