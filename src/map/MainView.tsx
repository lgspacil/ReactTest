import React, {useState, useMemo} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapViewEdit from './MapViewEdit';
import { ShapeContext } from '../hooks/ShapeContext';
import SidePanelMain from './SidePanelMain';
import SidePanelDeepLink from './SidePanelDeepLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const MainView = () => {
  const classes = useStyles();
  const [shapeId, setShapeId] = useState('');
  const [allowEdit, setAllowEdit] = useState(false);

  const providerValue = useMemo(() => (
    {shapeId, setShapeId, allowEdit, setAllowEdit}
  ), [shapeId, setShapeId, allowEdit, setAllowEdit]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <ShapeContext.Provider value={providerValue}>
          <Grid item xs={8}>
            <MapViewEdit />
          </Grid>
          <Grid item xs={4}>
            <SidePanelMain />
            <SidePanelDeepLink />
          </Grid>
        </ShapeContext.Provider>
      </Grid>
    </div>
  );
}

export default MainView;