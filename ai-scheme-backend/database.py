import sqlite3

def init_db():
    conn = sqlite3.connect("schemes.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS schemes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        min_age INTEGER,
        occupation TEXT,
        description TEXT
    )
    """)

    cursor.execute("SELECT COUNT(*) FROM schemes")
    count = cursor.fetchone()[0]

    if count == 0:
        cursor.execute("""
        INSERT INTO schemes (name, min_age, occupation, description)
        VALUES
        ('PM-KISAN', 18, 'farmer', 'Income support scheme for farmers'),
        ('Senior Citizen Pension', 60, 'any', 'Monthly pension for senior citizens'),
        ('Student Scholarship', 18, 'student', 'Financial support for students')
        """)

    conn.commit()
    conn.close()
