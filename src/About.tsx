import React from 'react';
import { useHistory } from 'react-router-dom';

const About: React.FunctionComponent = () => {
    const history = useHistory();

    const goBackHandler = () => {
        history.goBack();
    }

    const goToTodo = () => {
        history.push({
            pathname: '/todo',
            state: { name: 'lucas' }
        })
    }

    return (
        <>
            <div>About</div>
            <button onClick={goBackHandler}>Go Back</button>
            <button onClick={goToTodo}>Go Todo With State</button>
        </>
    )
}

export default About;