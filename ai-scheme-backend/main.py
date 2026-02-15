from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from database import init_db

app = FastAPI()

init_db()

# ✅ CORS — SIMPLE & CORRECT
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary state (hackathon demo)
user_state = {
    "age": None,
    "occupation": None
}

class Message(BaseModel):
    text: str
    language: str


@app.post("/chat")
def chat(message: Message):
    text = message.text.strip().lower()
    lang = message.language

    # Step 1: Ask age
    if user_state["age"] is None:
        if text.isdigit():
            user_state["age"] = int(text)
            return {
                "reply": "What is your occupation?"
                if lang == "en"
                else "आपका पेशा क्या है?"
            }
        else:
            return {
                "reply": "Please tell me your age."
                if lang == "en"
                else "कृपया अपनी उम्र बताइए।"
            }

    # Step 2: Ask occupation
    if user_state["occupation"] is None:
        user_state["occupation"] = text
        age = user_state["age"]
        occupation = user_state["occupation"]

        conn = sqlite3.connect("./schemes.db")
        cursor = conn.cursor()

        cursor.execute("""
            SELECT name, description
            FROM schemes
            WHERE min_age <= ?
              AND (occupation = ? OR occupation = 'any')
            LIMIT 1
        """, (age, occupation))

        result = cursor.fetchone()
        conn.close()

        # Reset state
        user_state["age"] = None
        user_state["occupation"] = None

        if result:
            name, desc = result
            return {
                "reply": f"You are eligible for {name}. {desc}"
                if lang == "en"
                else f"आप {name} योजना के लिए पात्र हैं। {desc}"
            }
        else:
            return {
                "reply": "No matching schemes found."
                if lang == "en"
                else "कोई उपयुक्त योजना नहीं मिली।"
            }
