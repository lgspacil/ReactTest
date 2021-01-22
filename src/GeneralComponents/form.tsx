import React, { useEffect, useState } from "react";
import { StoreContainer } from "../store";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Button, TextField } from "@material-ui/core";
import { useParams } from 'react-router';

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
    },
    bottomNavigation: {
      backgroundColor: '#faebd7',
      width: '100%'
    }
  }),
);

const FormComponent: React.FunctionComponent = () => {
  const form = StoreContainer.useContainer();

  // getting the params in the link with react-router
  const { firstname, lastname } = useParams<{ firstname: string, lastname: string }>();

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
          <p style={{ textAlign: 'center', color: 'white' }}>Link Names! {firstname} {lastname}</p>
          <p style={{ textAlign: 'center', color: 'white' }}>Hello! {form.name}</p>
        </Grid>

      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs={4}>
          <Paper className={classes.paper}><div>
            <TextField
              onChange={form.handleInput}
              value={form.input}
              error={message !== '' ? true : false}
              id="outlined-error-helper-text"
              label="Name"
              helperText={message}
              variant="outlined"
            />
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