import React from 'react';
import Home from './home';
import TodoComponent from "./todo";
import FormComponent from "./form";
import About from "./About";
import StarWars from "./starWarsExample/StarWars";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const ToolRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/starwars" component={StarWars} />
                <Route exact path="/form/:firstname/:lastname" component={FormComponent} />
                <Route exact path="/todo" component={TodoComponent} />
                <Route exact path="/about" component={About} />
            </Switch>
        </Router>
    )
}

export default ToolRouter;