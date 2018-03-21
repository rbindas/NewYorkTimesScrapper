import React from "react";
import "./Panel.css";

const Panel = ({ children }) => (
  <div style={{ height: 75, clear: "both" }} className="Panel">
    {children}
  </div>
);

export default Panel;
