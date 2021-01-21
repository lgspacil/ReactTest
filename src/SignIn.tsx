import { Button } from '@material-ui/core';
import React from 'react';
import { StoreContainer } from './store';
import {useHistory} from 'react-router-dom';

const SignIn = () => {
    const history = useHistory();
    const store = StoreContainer.useContainer();

    return (
        <div>
            <h1>Sign In</h1>
            <Button variant="contained" onClick={() => store.handleLogin(() => {history.push('/about')})}>Sign In</Button>
        </div>
    )
}

export default SignIn;