import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about government schemes." }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  let recognition;

  useEffect(() => {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    setSpeechSupported(false);
  }
  }, []);

  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
  recognition.interimResults = false;
  recognition.continuous = false;

  setIsListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    setInput(spokenText);
    setIsListening(false);
  };

  recognition.onerror = () => {
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};

const speakText = (text) => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel(); // stop old speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};


  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8090/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, language }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
speakText(data.reply);

    } catch {
      setMessages([...newMessages, { sender: "bot", text: "Backend not reachable" }]);
    }
  };

  return (
    <div className="home">
      {/* NAVBAR */}
      {/* <nav className="navbar">
        <h2 className="logo">Hacktivists</h2>
      </nav> */}

      {/* HERO SECTION (CANVA STYLE) */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            AI POWERED VOICE-FIRST <br /> CONVERSATIONAL SYSTEM 
          </h1>
          <p>
            Ask questions, check eligibility, and understand benefits
          </p>
        </div>
      </section>

      {/* CHAT SECTION */}
      <section className="chat-section">
        <h2>AI Scheme Assistant</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <div className="chat-box">
          {messages.map((m, i) => (
            <div key={i} className={m.sender === "user" ? "user-msg" : "bot-msg"}>
              <b>{m.sender === "user" ? "You" : "Bot"}:</b> {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask about schemes..."
  />

  {speechSupported && (
    <button
      onClick={startListening}
      className={isListening ? "mic-btn listening" : "mic-btn"}
      type="button"
    >
      {isListening ? "🎙️..." : "🎤"}
    </button>
  )}

  <button onClick={sendMessage}>Send</button>
</div>

      </section>

      {/* FOOTER ILLUSTRATION */}
  <div className="footer-illustration">
  <img
    src="/src/assets/city-footer.png"
    alt="City skyline"
  />
  </div>

    </div>
  );
}

export default Home;


