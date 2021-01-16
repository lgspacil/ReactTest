import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CropFreeSharp from '@material-ui/icons/CropFreeSharp';
import DeleteSharp from '@material-ui/icons/DeleteSharp';

interface Props {
  drawPolygon: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
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
        <div>
            <Fab color="primary" aria-label="add" className={classes.fab1} onClick={props.drawPolygon}>
                  <CropFreeSharp />
                
            </Fab>
            <Fab color="primary" aria-label="add" className={classes.fab2}>
                <DeleteSharp />
            </Fab>
        </div>
    )
}

export default MapIcons;