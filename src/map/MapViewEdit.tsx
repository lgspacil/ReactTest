import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapIcons from "./MapIcons";
import { StoreContainer } from "../store";
import MapPolygons from "./MapPolygons";
import { ShapeContext } from "../hooks/ShapeContext";
import DrawControlHistory from './DrawControlHistory';
import { FeatureCollection } from "@turf/turf";
import { drawControlStyles } from './stylePolygons';
// const StaticMode  = require('@mapbox/mapbox-gl-draw-static-mode');

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});
let drawControlRef: DrawControl | null = null; // ref to draw control
type DrawType = 'draw_polygon' | 'direct_select' | 'draw_line_string' | 'simple_select' | 'static';


const drawControlHistory = new DrawControlHistory;

const MapViewEdit = () => {

  const store = StoreContainer.useContainer();
  const { setShapeId, allowEdit } = useContext(ShapeContext);

  useEffect(() => {
    onLoadPrevShapes();
  }, [allowEdit])

  const getShapesAndDraw = () => {
    const fc = drawControlRef?.draw.getAll();
    drawControlHistory.setValue(fc);
    updateFeatureCollection(fc);
  }

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
    getShapesAndDraw()
  }

  const redo = () => {
    const fc = drawControlHistory.redo();
    drawControlRef?.draw.set(fc);
    updateFeatureCollection(fc);
  }

  const undo = () => {
    const fc = drawControlHistory.undo();
    drawControlRef?.draw.set(fc);
    updateFeatureCollection(fc);
  }

  const onLoadPrevShapes = () => {
    if (store.featureCollection) {
      drawControlHistory.setPreviousShapes(store.featureCollection)
      drawControlRef?.draw.set(store.featureCollection);
    }
  }

  const fieldSelectionUpdate = () => {
    const ids = drawControlRef?.draw.getSelectedIds();
    setShapeId(ids[0]);
  }

  const updateFeatureCollection = (fc: FeatureCollection | null) => {
    store.updateFeatureCollection(fc);
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
      {allowEdit ? <DrawControl
        styles={drawControlStyles()}
        ref={(drawControl) => drawControlRef = drawControl}
        onDrawCreate={getShapesAndDraw}
        onDrawUpdate={getShapesAndDraw}
        onDrawDelete={getShapesAndDraw}
        onDrawSelectionChange={fieldSelectionUpdate}
        displayControlsDefault={false}
      /> : <div /> }

      <MapIcons
        hasRedo={drawControlHistory.hasRedo}
        hasUndo={drawControlHistory.hasUndo}
        redo={redo}
        undo={undo}
        add={() => store.add()}
        drawPolygon={setDrawPolygon}
        delete={clearShape}
      />

      {MapPolygonsComp}
    </Map>
  );
}

export default MapViewEdit;
