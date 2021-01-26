import { Button } from '@material-ui/core';
import React from 'react';
import { StoreContainer } from '../store';
import {useHistory, useLocation} from 'react-router-dom';

interface LocationState {
    from: {
        pathname: string;
    };
  }

const SignIn = () => {
    const history = useHistory();
    const location = useLocation<LocationState>();
    const store = StoreContainer.useContainer();

    const signIn = async () => {
        await store.handleLogin();
        routeAfterSignIn();
    }

    const routeAfterSignIn = () => {
        if(location.state && location.state.from.pathname){
            history.push(location.state.from.pathname);
        }else{
            history.push('/');
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <Button 
                variant="contained" 
                onClick={signIn}
            >
                Sign In
            </Button>
        </div>
    )
}

export default SignIn;