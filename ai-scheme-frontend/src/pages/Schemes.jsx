function Schemes() {
  const schemes = [
    {
      name: "PM‑KISAN",
      description: "Income support scheme for farmers",
      eligibility: "Farmers above 18 years",
    },
    {
      name: "Senior Citizen Pension",
      description: "Monthly pension for senior citizens",
      eligibility: "Age 60 and above",
    },
    {
      name: "Student Scholarship",
      description: "Financial support for students",
      eligibility: "Students above 18 years",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Schemes</h1>

      {schemes.map((s, i) => (
        <div key={i} style={styles.card}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <p><b>Eligibility:</b> {s.eligibility}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
};

export default Schemes;
