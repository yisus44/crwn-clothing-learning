import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component.jsx";

const HatsPage = () => {
  return (
    <div>
      <h1>Hats page</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>

        <Route path="/shop/hats" component={HatsPage}></Route>
      </Switch>
    </div>
  );
}
//      <HomePage />

export default App;
