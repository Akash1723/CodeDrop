from fastapi import APIRouter,HTTPException
from app.fileshare.file_receive_service import get_file_link

router=APIRouter()

@router.get("/receive/{code}")
def handle_receive(code:str):
    try:
        link=get_file_link(code)
        return {"URL":link}
    except Exception as e:
         print(f"🔥 Error: {str(e)}")
         raise HTTPException(status_code=500, detail=str(e))
