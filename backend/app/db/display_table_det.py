import sqlite3
from connection import get_db_connection

conn=get_db_connection()
cur=conn.cursor()
cur.execute("SELECT * FROM file_links")
rows=cur.fetchall()
for row in rows:
    print(row["code"])