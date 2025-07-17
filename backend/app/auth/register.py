from fastapi import APIRouter,HTTPException
from pydantic import BaseModel,EmailStr
from app.db.connection import get_db_connection
from passlib.context import CryptContext

router=APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class RegisterUser(BaseModel):
    name:str
    email:EmailStr
    password:str
    phone:str
    
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register")
def register_user(user:RegisterUser):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM users where email=?",(user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400,detail="Email already registered")
    
    hashed_pw = hash_password(user.password)
    cursor.execute("""
        INSERT INTO users (username,email,password,phone) VALUES (?,?,?,?)
    """,(user.name, user.email, hashed_pw, user.phone))

    conn.commit()
    conn.close()

    return {"message": "User registered successfully ✅"}
