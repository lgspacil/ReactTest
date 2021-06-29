import { Button, FormControl, Grid, Input, InputAdornment, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { StoreContainer } from '../store';
import { useHistory, useLocation } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { AmplifyWrapper } from '../Class/AmplifyWrapper';
import { ApiWrapper } from '../Class/ApiWrapper';
import { Auth } from 'aws-amplify';

interface LocationState {
    from: {
        pathname: string;
    };
}

const SignIn = () => {
    const history = useHistory();
    const location = useLocation<LocationState>();
    const store = StoreContainer.useContainer();

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const signIn = async () => {
        await store.handleLogin();
        routeAfterSignIn();
    }

    const routeAfterSignIn = () => {
        if (location.state && location.state.from.pathname) {
            history.push(location.state.from.pathname);
        } else {
            history.push('/');
        }
    }

    const initEnvironment = () => {
        AmplifyWrapper.getInstance().init('dev');
    }

    const onSignIn = async () => {
        // REMOVE WHITE SPACE AND MAKE EMAIL ALL LOWER CASE
        const strippedUsername = data.username.toLowerCase().replace(/\s/g, '');

        initEnvironment();
        try {
            const user = await AmplifyWrapper.getInstance().signIn(strippedUsername, data.password);
            console.log('the user ', user);
        } catch (ex) {
            console.log('Sign in error', ex);
            // this.props.openAlertDialog({ message: ex.message });
        }

    }

    const handleFormChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, key: string) => {
        const name = key as keyof typeof data;

        setData({
            ...data,
            [name]: event.target.value,
        });
    };

    const loadOrders = async () => {
        try {
            const session = await AmplifyWrapper.getInstance().checkSession()
            console.log('Auth current session ', session);
            //   const orders = await ApiWrapper.getAllOrders();      
            //   console.log('the orders ', orders);
        } catch (err) {
            console.log('err ', err);
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

            <Grid
                container
                spacing={2}
                alignItems="center"
                justify="center"
                direction="column"
                style={{ height: '100%' }}
            >
                <Grid item>
                    <FormControl style={{ backgroundColor: '#e7e7e8b3', width: 360 }}>
                        <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                        <Input
                            onChange={event => handleFormChange(event, 'username')}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl style={{ backgroundColor: '#e7e7e8b3', width: 360 }}>
                        <InputLabel htmlFor="input-with-icon-adornment2">Password</InputLabel>
                        <Input
                            onChange={event => handleFormChange(event, 'password')}
                            id="input-with-icon-adornment2"
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={onSignIn}>Submit</Button>
                </Grid>
            </Grid>
            <Button onClick={loadOrders}>Load Orders</Button>
        </div>
    )
}

export default SignIn;