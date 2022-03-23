import React from "react";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
import { LoginScreen } from "./screens/login";

function App() {
  console.log("hello");
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
