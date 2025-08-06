from sqlalchemy import (Column, String, DateTime, ForeignKey, Boolean, JSON,
                        BigInteger, Text)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    plan = Column(String, default='Free')
    avatar_url = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Agent(Base):
    __tablename__ = "agents"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    avatar = Column(Text)
    model = Column(String)
    specialty = Column(Text)
    task = Column(Text)
    api_access = Column(JSON)
    mcp_servers = Column(JSON)
    is_custom = Column(Boolean, default=False)
    created_by = Column(String, ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class Session(Base):
    __tablename__ = "sessions"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    name = Column(String, nullable=False)
    last_active = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    session_id = Column(String, ForeignKey('sessions.id'), nullable=False)
    sender_type = Column(String, nullable=False) # 'user' or 'agent'
    agent_id = Column(String, ForeignKey('agents.id'), nullable=True)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    session = relationship("Session", back_populates="messages")
    agent = relationship("Agent")

class File(Base):
    __tablename__ = "files"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    name = Column(String, nullable=False)
    size_bytes = Column(BigInteger, nullable=False)
    mime_type = Column(String)
    storage_path = Column(Text, nullable=False, unique=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")

class Connection(Base):
    __tablename__ = "connections"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    type = Column(String, nullable=False) # 'vector_db', 'sql_db', 'crm'
    provider = Column(String, nullable=False)
    name = Column(String, nullable=False)
    credentials = Column(JSON, nullable=False) # Store encrypted
    status = Column(String, default='disconnected')
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
