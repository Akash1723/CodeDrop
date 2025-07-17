from app.db.connection import get_db_connection
import time

def get_file_link(code):
    conn=get_db_connection()
    curr=conn.cursor()
    curr.execute("Select * from file_links where code=?",(code,))
    result=curr.fetchone()
    conn.close()

    if not result:
        raise Exception("Not found")

    if result['expires_at']<time.time():
        raise Exception("Expired")
    else:
        return result["file_url"]