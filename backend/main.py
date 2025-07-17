from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import register,login
from app.fileshare import file_upload
from app.fileshare import file_receive
from app.db.create_table import create_tables

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register.router,prefix="/api",tags=["Register"])
app.include_router(login.router,prefix="/api",tags=["Login"])
app.include_router(file_upload.router,prefix="/api",tags=["Upload"])
app.include_router(file_receive.router,prefix="/api",tags=["Receive"])

create_tables()