import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapIcons from './MapIcons';
import './Map.css';

const MapView = () => {

    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
    });

    return (
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: `100%`,
            }}
        >
            <DrawControl
                // ref={(drawControl) => { this.drawControl = drawControl; }}
                // onDrawCreate={this.onDrawCreate}
                // onDrawUpdate={this.onDrawUpdate}
                // onDrawModeChange={this.onDrawModeChange}
                // controls={{ trash: false, combine_features: false, uncombine_features: false, point: false, line_string: false, polygon: false }}
                // styles={drawControlStyles()}
            />

            <MapIcons />
        </Map>
        
    )

}

export default MapView;