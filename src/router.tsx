import React from 'react';
import TodoComponent from "./todo";
import FormComponent from "./form";
import About from "./About";
import StarWars from "./starWarsExample/StarWars";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from './map/MainView';

const ToolRouter = () => {
    return (
        <div style={{ marginLeft: 72 }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={MainView} />
                    <Route exact path="/starwars" component={StarWars} />
                    <Route exact path="/form/:firstname/:lastname" component={FormComponent} />
                    <Route exact path="/todo" component={TodoComponent} />
                    <Route exact path="/about" component={About} />
                </Switch>
            </Router>
        </div>
    )
}

export default ToolRouter;