import React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: any;
    user: boolean;
}

const ProtectedRoute = (props: PrivateRouteProps) => {
    const { component: Component, user, ...rest } = props;

    console.log('Protected')

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