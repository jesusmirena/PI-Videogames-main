import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>hola</h1>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/Createvideogame" component={CreateVideogame} />
            <Route exact path="/videogame/:id" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
