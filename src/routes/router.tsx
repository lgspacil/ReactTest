import React from 'react';
import TodoComponent from "../todo";
import FormComponent from "../form";
import About from "../About";
import StarWars from "../starWarsExample/StarWars";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from '../map/MainView';
import SignIn from '../SignIn';
import ProtectedRoute from './ProtectedRoute';
import { StoreContainer } from '../store';

const ToolRouter = () => {

    const store = StoreContainer.useContainer();

    return (
        <div style={{ marginLeft: 72 }}>
            {/* <Router> */}
                <Switch>
                    <Route exact path="/" component={MainView} />
                    <Route exact path="/starwars" component={StarWars} />
                    <Route exact path="/form/:firstname/:lastname" component={FormComponent} />
                    <Route exact path="/todo" component={TodoComponent} />
                    <ProtectedRoute exact path='/about' user={store.user} component={About} />
                    <Route exact path="/signIn" component={SignIn} />
                </Switch>
            {/* </Router> */}
        </div>
    )
}

export default ToolRouter;