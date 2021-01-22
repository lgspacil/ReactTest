import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CropFreeSharp from '@material-ui/icons/CropFreeSharp';
import DeleteSharp from '@material-ui/icons/DeleteSharp';
import AddOutlined from '@material-ui/icons/AddOutlined';

interface Props {
  drawPolygon: () => void;
  delete: () => void;
  add: () => void;
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
      bottom: 90,
      left: 'auto',
      position: 'absolute',
    },
    fab3: {
      backgroundColor: '#718993',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 160,
      left: 'auto',
      position: 'absolute',
    }
  }),
);

const MapIcons: React.FunctionComponent<Props> = (props: Props) => {

  const classes = useStyles();

  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab1} onClick={props.drawPolygon}>
        <CropFreeSharp />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fab2} onClick={props.delete}>
        <DeleteSharp />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fab3} onClick={props.add}>
        <AddOutlined />
      </Fab>
    </>
  )
}

export default MapIcons;