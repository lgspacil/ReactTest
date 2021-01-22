export const drawControlStyles = () => {
    return [
        // ACTIVE (being drawn)
        // first line stroke
        {
            id: 'gl-draw-line',
            type: 'line',
            filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'yellow',
                'line-dasharray': [0.2, 2],
                'line-width': 4,
            },
        },
        // polygon outline stroke
        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
        {
            id: 'gl-draw-polygon-stroke-active',
            type: 'line',
            filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'yellow',
                'line-dasharray': [0.2, 2],
                'line-width': 4,
            },
        },
        // vertex point halos
        {
            id: 'gl-draw-polygon-and-line-vertex-halo-active',
            type: 'circle',
            filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
            paint: {
                'circle-radius': 7,
                'circle-color': '#FFF',
            },
        },
        // vertex points
        {
            id: 'gl-draw-polygon-and-line-vertex-active',
            type: 'circle',
            filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
            paint: {
                'circle-radius': 5,
                'circle-color': 'green',
            },
        },
        // INACTIVE (direct_select, already drawn, and active)

        // polygon fill
        {
            id: 'gl-draw-polygon-fill-inactive',
            type: 'fill',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'direct_select'], ['==', 'active', 'true']],
            paint: {
                'fill-color': 'yellow',
                'fill-opacity': 0.25,
            },
        },
        // polygon outline
        {
            id: 'gl-draw-polygon-stroke-static',
            type: 'line',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'direct_select'], ['==', 'active', 'true']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#747c4a',
                'line-dasharray': [0.2, 2],
                'line-width': 3,
            },
        },
        //Mid Point of active polygon
        {
            id: 'gl-draw-polygon-midpoint',
            type: 'circle',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
            paint: {
                'circle-radius': 5,
                'circle-color': 'white',
            },
        },
    ];
};
