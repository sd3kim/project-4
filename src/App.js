import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogOut from "./components/UserLogOut/UserLogOut";
import AuthPage from "./pages/AuthPage/AuthPage";

class App extends React.Component {
  state = {
    user: null,
  };
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let userDoc = payload.user;
        this.setState({ user: userDoc });
      }
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <UserLogOut
              setUserInState={this.setUserInState}
              user={this.state.user}
            />
            Hello
          </div>
        ) : (
          <AuthPage setUserInState={this.setUserInState} />
        )}
      </div>
    );
  }
}

export default App;
