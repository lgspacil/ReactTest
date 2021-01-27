import { FeatureCollection } from '@turf/turf';
import { GeoJSONLayer } from "react-mapbox-gl";
import React, { useEffect } from 'react';
import { StoreContainer } from '../store';

interface Props {
    fc: FeatureCollection | null;
}

const MapPolygons = (props: Props) => {
    
    const store = StoreContainer.useContainer();

    return (<>
        <GeoJSONLayer
            data={store.featureCollection}
            fillPaint={{ "fill-color": 'black', 'fill-opacity': 0.3 }}
            linePaint={{ 'line-color': 'red', 'line-width': 4 }}
            // fillOnMouseEnter={(event) => this.onEnteredPolygon(event)}
            // fillOnMouseLeave={(event) => this.onLeftPolygon(event)}
        />
    </>)
}

export default MapPolygons;