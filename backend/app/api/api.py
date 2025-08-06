from fastapi import APIRouter
from .v1.endpoints import agents, sessions, files, integrations

api_router = APIRouter(prefix="/v1")

api_router.include_router(agents.router, prefix="/agents", tags=["Agents"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["Sessions"])
api_router.include_router(files.router, prefix="/files", tags=["Files"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])