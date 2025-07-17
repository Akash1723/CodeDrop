import sqlite3
from app.db.connection import get_db_connection

def create_tables():
    conn = get_db_connection()
    cursor=conn.cursor()

    cursor.execute("""
     CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone TEXT NOT NULL
    )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS file_links (
            code TEXT PRIMARY KEY,
            file_url TEXT NOT NULL,
            expires_at INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()
