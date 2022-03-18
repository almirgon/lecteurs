import React, {useEffect, useContext} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import RoutesManager from "./routes";
import Header from "./components/Header/Header";
import "./App.css";
import {UserContext} from "./context/UserContext";

function App() {
  const context = useContext(UserContext);
  const {setAuthorized, setUsername} = context;

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (token && username) {
      setAuthorized(true);
      setUsername(JSON.parse(username));
    }
  }, []);
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
