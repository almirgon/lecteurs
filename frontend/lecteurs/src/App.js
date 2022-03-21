import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import RoutesManager from "./routes";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="AppBody">
          <RoutesManager />
        </main>
      </Router>
    </div>
  );
}

export default App;
