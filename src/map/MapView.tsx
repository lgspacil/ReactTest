import React, { useEffect, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapIcons from './MapIcons';
import './Map.css';
import { Feature, FeatureCollection } from '@turf/turf';
import { StoreContainer } from '../store';

type DrawType = 'draw_polygon' | 'direct_select' | 'draw_line_string' | 'simple_select';

interface drawCreate {
    features: Feature[];
}

// let drawControlRef: DrawControl | null = null; // ref to draw control


const MapView = () => {

    const store = StoreContainer.useContainer();
    
    const [drawControlRef, setDrawControlRef] = useState<DrawControl | null>(null);

    
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
    });


    const onDrawCreate = ({ features }: drawCreate) => {
        console.log('onDrawCreate', features);

        // const zoneNumber = this.props.zones.length + 1;

        const year = (new Date()).getFullYear();
        let fieldName = `Field - ${year}`;

        store.addZone(features[0])
    }

    const onDrawUpdate = () => {
        console.log('onDrawUpdate');
    }

    const onDrawModeChange = () => {
        console.log('onDrawModeChange');
    }

    const setSimpleSelect = () => {
        drawControlRef?.draw.changeMode('simple_select')
    }

    const setDrawPolygon = () => {
        // const currentMode: DrawType = drawControlRef?.draw.getMode();
        // if (currentMode === 'draw_polygon') {
        //     setSimpleSelect();
        // } else {
        //     drawControlRef?.draw.changeMode('draw_polygon')
        // }
    }

    // console.log('HEY THE ZONES ', store.zones);


    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: `100%`,
            }}
        >
            {/* <DrawControl
                ref={(drawControl) => { setDrawControlRef(drawControl) }}
                onDrawCreate={onDrawCreate}
                onDrawUpdate={onDrawUpdate}
                onDrawModeChange={onDrawModeChange}
            // controls={{ trash: false, combine_features: false, uncombine_features: false, point: false, line_string: false, polygon: true }}
            /> */}

            {/* <DrawControl
                ref={(drawControl) => { setDrawControlRef(drawControl) }}
            /> */}

            <MapIcons
                drawPolygon={setDrawPolygon}
            />
        </Map>

    )

}

export default MapView;