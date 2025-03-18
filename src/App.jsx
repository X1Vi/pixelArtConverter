import React, { useState } from "react";
import Converter from "./components/Converter";
import Showcase from "./components/Showcase";
import { terminalTheme } from "./functions/theme";

const TerminalNavbar = ({ setActiveComponent }) => {
  return (
    <nav
      style={{
        background: terminalTheme.background,
        color: terminalTheme.text,
        padding: "10px",
        borderBottom: `2px solid ${terminalTheme.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50px",
        
      }}
    >
      <span style={{ color: terminalTheme.accent, fontWeight: "bold", fontFamily:'monospace' }}>
        Terminal Navbar
      </span>
      <div>
        <button
          style={{
            background: "transparent",
            border: `1px solid ${terminalTheme.accent}`,
            color: terminalTheme.text,
            padding: "5px 10px",
            cursor: "pointer",
            marginRight: "5px",
            borderRadius:"20px"
          }}
          onClick={() => setActiveComponent("converter")}
        >
          Show Converter
        </button>
        <button
          style={{
            background: "transparent",
            border: `1px solid ${terminalTheme.accent}`,
            color: terminalTheme.text,
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius:"20px"
          }}
          onClick={() => setActiveComponent("showcase")}
        >
          Showcase
        </button>
      </div>
    </nav>
  );
};

function App() {
  const [activeComponent, setActiveComponent] = useState("converter");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: terminalTheme.background,
        color: terminalTheme.text,
      }}
    >
      <TerminalNavbar setActiveComponent={setActiveComponent} />
      <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
        {activeComponent === "converter" && <Converter />}
        {activeComponent === "showcase" && <Showcase />}
      </div>
    </div>
  );
}

export default App;
