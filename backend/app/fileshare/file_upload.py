from fastapi import APIRouter,HTTPException,UploadFile,File
from app.fileshare.file_upload_service import upload_to_fileio
import qrcode
import base64
from io import BytesIO

router=APIRouter()

@router.post("/upload")
async def handle_file_upload(file:UploadFile=File(...)):
    try:
        print("✅ Upload endpoint hit")
        print(f"File received: {file.filename}")
        code, link = upload_to_fileio(file)
        print(f"Generated Code: {code}, File Link: {link}")

        #qr generation
        qr = qrcode.QRCode(version=1, box_size=6, border=2)
        qr.add_data(link)
        qr.make(fit=True)
        img = qr.make_image(fill="black", back_color="white")

        #converting qr to base64 text
        buf = BytesIO()
        img.save(buf, format="PNG")
        qr_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        qr_data_url = f"data:image/png;base64,{qr_base64}"

        return {
            "code": code,
            "qr": qr_data_url
        }
    except Exception as e:
         print(f"🔥 Error: {str(e)}")
         raise HTTPException(status_code=500, detail=str(e))