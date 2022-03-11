import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {UserStorage} from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserStorage>
      <App />
    </UserStorage>
  </React.StrictMode>,
  document.getElementById("root"),
);
