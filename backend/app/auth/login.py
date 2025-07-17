from fastapi import APIRouter,HTTPException
from app.db.connection import get_db_connection
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr


router=APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
def validate_login(credentials: LoginRequest):
    conn=get_db_connection()
    curr=conn.cursor()

    curr.execute("Select * from users where email=?",(credentials.email,))
    user=curr.fetchone()
    if not user:
        conn.close()
        raise HTTPException(status_code=401,detail="Email not registered")
    if not pwd_context.verify(credentials.password, user["password"]):
        conn.close()
        raise HTTPException(status_code=401,detail="Invalid password")
    
    conn.close()
    return {
        "message": "Login successful ✅",
        "user": {
            "id": user["id"],
            "name": user["username"],
            "email": user["email"],
            "phone": user["phone"]
        }
    }
    