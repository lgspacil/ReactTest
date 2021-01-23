import React, {useContext, useEffect, useState} from 'react';
import { StoreContainer } from '../store';
import * as turf from '@turf/turf';
import { useParams } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const SidePanelDeepLink = () => {

    // getting the params in the link with react-router
    let id: string = ''
    const params = useParams<{ shapeId: string }>();

    if(params.shapeId){
        id = params.shapeId;
    }

    const store = StoreContainer.useContainer();
    const [acres, setAcres] = useState<null | number>(null)

    // Use effect runs the first time component renders as well as any time the dependecies change.
    useEffect(() => {
        if(id){
            if(store.featureCollection){
                for(const feature of store.featureCollection?.features){
                    if(feature.id === id){
                        setAcres(turf.area(feature) * 0.000247105);
                        break;
                    }
                }
            }   
        }else{
            setAcres(null)
        }
    }, [id, store.featureCollection])

    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Deep Link
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            ID: {id}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Acres: {acres}
          </Typography>
        </CardContent>
      </Card>
    );
}

export default SidePanelDeepLink;