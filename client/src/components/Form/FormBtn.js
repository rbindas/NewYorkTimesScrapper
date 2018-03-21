import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ margin: "auto", display: "block", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);
