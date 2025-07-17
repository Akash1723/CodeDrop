import requests
import time
import random
import string
from app.db.connection import get_db_connection

def generate_unique_code(length=6):
    conn = get_db_connection()
    cursor = conn.cursor()

    while True:
        code = ''.join(random.choices(string.digits, k=length))
        cursor.execute("SELECT 1 FROM file_links WHERE code = ?", (code,))
        result = cursor.fetchone()
        if result is None:
            break 

    conn.close()
    return code

def upload_to_fileio(file):
    files={'file':(file.filename,file.file)}
    data = {
        'token': 'rXDbqE17q9aMaLkQScQroNEgw5h9Dlw6'
        }
    response = requests.post('https://upload.gofile.io/uploadfile', files=files,data=data)
    print("File.io Status Code:", response.status_code)
    print("File.io Raw Response:", response.text)  

    if response.status_code==200:
        res_data=response.json()
        if res_data["status"]=="ok":
            print(res_data['data'])
            file_url=res_data['data']['downloadPage']
            unique_code=generate_unique_code()
            conn=get_db_connection()
            cursor=conn.cursor()

            expires_at = int(time.time() + 60 * 60)

            cursor.execute("""
                INSERT INTO file_links (code, file_url, expires_at) VALUES (?, ?, ?)
            """, (unique_code, file_url, expires_at))

            conn.commit()
            conn.close()



            return unique_code, file_url
        else:
            raise Exception("File.io error: " + res_data.get('message', 'Unknown error'))
    else:
        raise Exception(f"Failed to upload file: {response.status_code}")