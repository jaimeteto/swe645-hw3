import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("…");

  useEffect(() => {
    const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
    fetch(`${base}/health`)
      .then((r) => r.json())
      .then((d) => setHealth(d.status))
      .catch(() => setHealth("unreachable"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Student Survey (Frontend)</h1>
      <p>Backend health: <b>{health}</b></p>
    </div>
  );
}

export default App;
