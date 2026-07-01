"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Backend not connected");
      });
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>ExpenseOS</h1>
      <h2>{message}</h2>
    </main>
  );
}
