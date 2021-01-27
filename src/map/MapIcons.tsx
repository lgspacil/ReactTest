import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CropFreeSharp from '@material-ui/icons/CropFreeSharp';
import DeleteSharp from '@material-ui/icons/DeleteSharp';
import AddOutlined from '@material-ui/icons/AddOutlined';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import { Switch, Tooltip } from '@material-ui/core';

interface Props {
  drawPolygon: () => void;
  delete: () => void;
  add: () => void;
  undo: () => void;
  redo: () => void;
  hasRedo: boolean;
  hasUndo: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    fab1: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'absolute',
    },
    fab2: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 70,
      left: 'auto',
      position: 'absolute',
    },
    fab3: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 120,
      left: 'auto',
      position: 'absolute',
    },
    fab4: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 170,
      left: 'auto',
      position: 'absolute',
    },
    fab5: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 220,
      left: 'auto',
      position: 'absolute',
    }
  }),
);

const MapIcons: React.FunctionComponent<Props> = (props: Props) => {

  const classes = useStyles();

  return (
    <>
      <Fab size="small" color="primary" aria-label="add" className={classes.fab1} onClick={props.drawPolygon}>
        <Tooltip title={'Draw Polygon'}>
          <CropFreeSharp />
        </Tooltip>
      </Fab>
      <Fab size="small" color="primary" aria-label="add" className={classes.fab2} onClick={props.delete}>
        <Tooltip title={'Delte'}>
          <DeleteSharp />
        </Tooltip>
      </Fab>
      <Fab size="small" color="primary" aria-label="add" className={classes.fab3} onClick={props.add}>
        <Tooltip title={'Add Number'}>
          <AddOutlined />
        </Tooltip>
      </Fab>
      <Fab size="small" color="primary" disabled={!props.hasUndo} aria-label="add" className={classes.fab4} onClick={props.undo}>
        <Tooltip title={'Undo'}>
          <Undo />
        </Tooltip>
      </Fab>
      <Fab size="small" color="primary" disabled={!props.hasRedo} aria-label="add" className={classes.fab5} onClick={props.redo}>
        <Tooltip title={'Redo'}>
          <Redo />
        </Tooltip>
      </Fab>
    </>
  )
}

export default MapIcons;