import React from "react";
import "./styles.css";
import Bills from "./Bills";
import Members from "./Members";

export default function App() {
  return (
    <React.Fragment>
      <Bills />
      <Members />
    </React.Fragment>
  );
}
