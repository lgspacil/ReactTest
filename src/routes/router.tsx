import React, { useEffect, useMemo, useState } from 'react';
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
import BasicTable from '../GeneralComponents/BasicTable';
import ImageComponent from '../GeneralComponents/ImageComponent';
import { config } from '../config';

const ToolRouter = () => {

    // Importing global store container
    const store = StoreContainer.useContainer();

    useEffect(() => {
        if(config.version !== store.storeVersion){
            console.log('we have a problem');
            store.handleLogout();
        }
    })

    return useMemo(() => (
        <div style={{ marginLeft: 72 }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/map/:shapeId?" user={store.user} component={MainView} />
                <Route exact path="/starwars" component={StarWars} />
                <Route exact path="/form/:firstname/:lastname" component={FormComponent} />
                <ProtectedRoute exact path='/todo' user={store.user} component={TodoComponent} />
                <ProtectedRoute exact path='/about' user={store.user} component={About} />
                <Route exact path="/signIn" component={SignIn} />
                <Route exact path="/table" component={BasicTable} />
                <Route exact path="/image" component={ImageComponent} />
            </Switch>
        </div>
    ), [store.user])
}

export default ToolRouter;