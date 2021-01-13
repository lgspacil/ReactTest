import React, { useEffect, useState } from 'react';

interface IMouseMoveEvent {
    x: number;
    y: number;
}

export const Square: React.FunctionComponent = () => {

    const [event, setEvent] = useState<IMouseMoveEvent | undefined>(undefined);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setEvent({x: e.x, y: e.y});
        }

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            // clean up
            console.log('square component unmounted');
            // remove envent subscribed to 
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (<div style={{height: 100, width: 100, backgroundColor: 'green', marginTop: 10}}>
        <p style={{color: 'white'}}>x: {event?.x}</p>
        <p style={{color: 'white'}}>y: {event?.y}</p>
    </div>);
}