import { FeatureCollection } from '@turf/turf';
import React, { useEffect } from 'react';

interface Props {
    fc: FeatureCollection | null;
}

const MapPolygons = (props: Props) => {
    const info = useEffect(() => {
        console.log('Map polygons use effect hit');
    })

    return (<div />)
}

export default MapPolygons;