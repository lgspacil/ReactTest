import React, { useEffect, useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import 'mapbox-gl/dist/mapbox-gl.css';
// import "./styles.css";
import { Feature } from "@turf/turf";
import * as turf from '@turf/turf';
import MapIcons from "./MapIcons";
import { StoreContainer } from "../store";
import MapPolygons from "./MapPolygons";
// import {drawControlStyles} from './stylePolygons';

interface drawCreate {
  features: Feature[];
}

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

let drawControlRef: DrawControl | null = null; // ref to draw control

type DrawType = 'draw_polygon' | 'direct_select' | 'draw_line_string' | 'simple_select';

const MapView = () => {

  const store = StoreContainer.useContainer();

  const setDrawPolygon = () => {
    const currentMode: DrawType = drawControlRef?.draw.getMode();
    if (currentMode === 'draw_polygon') {
      setSimpleSelect();
    } else {
      drawControlRef?.draw.changeMode('draw_polygon')
    }
  }

  const setSimpleSelect = () => {
    drawControlRef?.draw.changeMode('simple_select')
  }

  const clearShape = () => {
    const ids = drawControlRef?.draw.getSelectedIds();
    drawControlRef?.draw.delete(ids);
    updateFeatureCollection()
  }

  const updateFeatureCollection = () => {
    const fc = drawControlRef?.draw.getAll();
    store.updateFeatureCollection(fc);
  }

  const onLoadPrevShapes = () => {
    if(store.featureCollection){
      drawControlRef?.draw.set(store.featureCollection);
    }
  }

  const MapPolygonsComp = useMemo(() => { return <MapPolygons fc={store.featureCollection} /> }, [store.featureCollection])

  return (
    <Map
      onStyleLoad={() => onLoadPrevShapes()}
      style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
      containerStyle={{
        height: '100vh',
        width: '100%'
      }}
    >
      <DrawControl
        ref={(drawControl) => drawControlRef = drawControl}
        onDrawCreate={updateFeatureCollection}
        onDrawUpdate={updateFeatureCollection}
        onDrawDelete={updateFeatureCollection}
        controls={{ trash: false, combine_features: false, uncombine_features: false, point: false, line_string: false, polygon: false }}
        // styles={drawControlStyles()}
      />

      <MapIcons
        add={() => store.add()}
        drawPolygon={setDrawPolygon}
        delete={clearShape}
      />

      {MapPolygonsComp}
    </Map>
  );
}

export default MapView;
