from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api.api import api_router
import os

# Create all database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="M+ BonsAI API",
    description="Backend services for the M+ BonsAI multi-agent platform.",
    version="1.0.0"
)

# Configure CORS to allow the frontend to communicate with the backend.
# In a production environment, you should restrict this to your frontend's domain.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router
app.include_router(api_router, prefix="/api")

@app.get("/api/health", tags=["System"])
def health_check():
    """
    Health check endpoint to verify that the server is running.
    """
    return {"status": "OK"}