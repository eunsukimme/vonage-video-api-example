import React, { useEffect } from "react";
import "./app.css";
import initializeSession from "@utils/vonage";

function App() {
  useEffect(() => {
    initializeSession();
  }, []);

  return (
    <div id="videos">
      <h1>Vonage Group Call Example</h1>
      <div id="subscriber"></div>
      <div id="publisher"></div>
    </div>
  );
}

export default App;
