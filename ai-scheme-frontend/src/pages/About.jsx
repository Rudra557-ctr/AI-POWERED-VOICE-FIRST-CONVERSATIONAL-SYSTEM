import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About AI Scheme Assistant</h1>

        <p>
          AI Scheme Assistant is a multilingual, AI‑powered platform that helps
          citizens discover government schemes they are eligible for using simple
          conversations.
        </p>

        <h2>How it works</h2>
        <ul>
          <li>User interacts in English or Hindi</li>
          <li>System collects basic profile details</li>
          <li>Eligibility is checked using a database</li>
          <li>Relevant schemes are suggested instantly</li>
        </ul>

        <h2>Why this matters</h2>
        <ul>
          <li>Reduces language barriers</li>
          <li>Saves time and confusion</li>
          <li>Scales easily with more data</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
