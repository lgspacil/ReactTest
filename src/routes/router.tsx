import React, {useMemo} from 'react';
import TodoComponent from "../GeneralComponents/todo";
import FormComponent from "../GeneralComponents/form";
import About from "../GeneralComponents/About";
import StarWars from "../starWarsExample/StarWars";
import { Route, Switch } from 'react-router-dom';
import MainView from '../map/MainView';
import SignIn from '../GeneralComponents/SignIn';
import ProtectedRoute from './ProtectedRoute';
import { StoreContainer } from '../store';
import Home from '../GeneralComponents/Home';

const ToolRouter = () => {

    const store = StoreContainer.useContainer();

    return (
        <div style={{ marginLeft: 72 }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/map/:shapeId?" user={store.user} component={MainView} />
                <Route exact path="/starwars" component={StarWars} />
                <Route exact path="/form/:firstname/:lastname" component={FormComponent} />
                <ProtectedRoute exact path='/todo' user={store.user} component={TodoComponent} />
                <ProtectedRoute exact path='/about' user={store.user} component={About} />
                <Route exact path="/signIn" component={SignIn} />
            </Switch>
        </div>
    )
}

export default ToolRouter;