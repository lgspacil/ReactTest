import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapView from './MapView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const MainView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <MapView />
        </Grid>
        <Grid item xs={4}>
          <p>side pannel</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainView;