import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: any;
    user: boolean;
    redirectRoute?: string;
}

const ProtectedRoute = (props: PrivateRouteProps) => {
    const { component: Component, user, redirectRoute, ...rest } = props;

    console.log('the user ', user);

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                user ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/signIn',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default ProtectedRoute;