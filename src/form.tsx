import React, { useEffect, useState } from "react";
import { StoreContainer } from "./store";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#596e6e'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      color: 'white',
      backgroundColor: '#596e6e',
      '&:hover': {
        backgroundColor: '#fdba58',
        borderColor: 'black',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'white',
        borderColor: 'black',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    }
  }),
);

const FormComponent: React.FunctionComponent = () => {
  const form = StoreContainer.useContainer();

  const [message, setMessage] = useState('');

  // Will be called every time the input value has changed
  useEffect(() => {
    if (form.input.length > 1 && form.input.length < 4) {
      setMessage('Minimum length is 4 characters')
    } else {
      setMessage('')
    }
  }, [form.input])

  const classes = useStyles();
  return (
    
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <Paper className={classes.paper}><p>Hello! {form.name}</p></Paper>
          </Grid>

        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={4}>
            <Paper className={classes.paper}><div>
              <input type="text" value={form.input} onChange={form.handleInput} />
              <p style={{ color: 'red' }}>{message}</p>
            </div></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button} onClick={form.updateName}>
                Change Name
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    
  );
};
export default FormComponent;