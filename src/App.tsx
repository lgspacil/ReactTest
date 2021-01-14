import React from 'react';
import TodoComponent from "./todo";
import FormComponent from "./form";
import About from "./About";
import StarWars from "./starWarsExample/StarWars";
import { StoreContainer } from "./store"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App: React.FunctionComponent<{}> = () => (
  <Router>
    <div className="App" style={{ padding: 20 }}>
      <StoreContainer.Provider>
      <ul>
        <li>
          <Link to="/">StarWars</Link>
        </li>
        <li>
          <Link to="/form/John/Johnson">Form</Link>
        </li>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div>
        <Switch>
          <Route exact path="/" component={StarWars}/>
          <Route exact path="/form/:firstname/:lastname" component={FormComponent}/>
          <Route exact path="/todo" component={TodoComponent}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </div>
      </StoreContainer.Provider>
    </div>
  </Router>
)

export default App;