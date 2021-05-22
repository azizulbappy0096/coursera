import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import Main from "./components/MainComponent";
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";

class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Router>
          <div>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
