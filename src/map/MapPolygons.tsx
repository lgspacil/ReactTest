import { FeatureCollection } from '@turf/turf';
import { GeoJSONLayer } from "react-mapbox-gl";
import React, { useContext, useEffect } from 'react';
import { ShapeContext } from '../hooks/ShapeContext';
import * as turf from '@turf/turf';

interface Props {
    fc: FeatureCollection | null;
}

const MapPolygons = (props: Props) => {

    // const store = StoreContainer.useContainer();
    const { shapeId } = useContext(ShapeContext);

    const newFeatureList = props.fc?.features.filter((feature) => {
        if (feature.id !== shapeId) {
            return feature
        }
    })

    let trimmedFc: FeatureCollection | undefined;
    if (newFeatureList) {
        trimmedFc = turf.featureCollection(newFeatureList);
    }


    return (<>
        <GeoJSONLayer
            data={trimmedFc ? trimmedFc : props.fc}
            // fillPaint={{ "fill-color": 'black', 'fill-opacity': 0.3 }}
            linePaint={{ 'line-color': '#f5b336', 'line-width': 3 }}
        // fillOnMouseEnter={(event) => this.onEnteredPolygon(event)}
        // fillOnMouseLeave={(event) => this.onLeftPolygon(event)}
        />
    </>)
}

export default MapPolygons;