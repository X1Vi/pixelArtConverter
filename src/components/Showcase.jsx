import React, { useState, useEffect } from "react";
import { terminalTheme } from "../functions/theme";

const basePath = "/pixelArtConverter"; // Adjust based on your deployment
const images = [
  `${basePath}/Images/pixelated-image-1.png`,
  `${basePath}/Images/pixelated-image-2.png`,
  `${basePath}/Images/pixelated-image.png`,
  `${basePath}/Images/p.png`,
];


function Showcase() {
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(4);

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth;
      if (width < 480) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    }

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div style={{ padding: "16px", background: terminalTheme.background, color: terminalTheme.text }}>
      {/* <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
        <label>
          Gap:
          <input
            type="number"
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            min="0"
            max="10"
            style={{
              marginLeft: "8px",
              padding: "5px",
              background: terminalTheme.secondary,
              color: terminalTheme.text,
              border: `1px solid ${terminalTheme.border}`,
              borderRadius: "4px",
              outline: "none",
            }}
          />
        </label>
      </div> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap * 4}px`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: `0px 4px 6px rgba(0, 255, 0, 0.3)`,
              border: `2px solid ${terminalTheme.accent}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Showcase;
