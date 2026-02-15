from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
import sqlite3

app = FastAPI()

# Temporary in-memory user state (for hackathon demo)
user_state = {
    "age": None,
    "occupation": None
}


init_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str
    language: str


@app.post("/chat")
def chat(message: Message):
    text = message.text.lower()
    lang = message.language

    # Ask age
    if user_state["age"] is None:
        if text.isdigit():
            user_state["age"] = int(text)
            return {
                "reply": "What is your occupation?" if lang == "en"
                else "आपका पेशा क्या है?"
            }
        else:
            return {
                "reply": "Please tell me your age." if lang == "en"
                else "कृपया अपनी उम्र बताइए।"
            }

    # Ask occupation
    if user_state["occupation"] is None:
        user_state["occupation"] = text
        age = user_state["age"]
        occupation = user_state["occupation"]

        conn = sqlite3.connect("schemes.db")
        cursor = conn.cursor()

        cursor.execute("""
        SELECT name, description FROM schemes
        WHERE min_age <= ?
        AND (occupation = ? OR occupation = 'any')
        """, (age, occupation))

        results = cursor.fetchall()
        conn.close()

        user_state["age"] = None
        user_state["occupation"] = None

        if results:
            name, desc = results[0]
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

   
