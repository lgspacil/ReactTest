import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';

// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const Home = () => {

    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
    });

    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: 'calc(100vh - 52px)',
                width: `100vw`,
            }}
        >
            <DrawControl
                // ref={(drawControl) => { this.drawControl = drawControl; }}
                // onDrawCreate={this.onDrawCreate}
                // onDrawUpdate={this.onDrawUpdate}
                // onDrawModeChange={this.onDrawModeChange}
                controls={{ trash: false, combine_features: false, uncombine_features: false, point: false, line_string: false, polygon: false }}
                // styles={drawControlStyles()}
            />
        </Map>
    )

}

export default Home;