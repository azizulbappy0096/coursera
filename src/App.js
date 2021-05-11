import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css"
import "font-awesome/css/font-awesome.min.css"
import "./App.css";
import Main from "./components/MainComponent";
import { BrowserRouter as Router } from "react-router-dom"


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
        <Main />
      </div>
      </Router>
    );
  }
}

export default App;
