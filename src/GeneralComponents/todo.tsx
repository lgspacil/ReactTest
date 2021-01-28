import React, { useState } from "react";
import { Square } from "./square";
import { StoreContainer } from "../store";
import { useLocation } from 'react-router';
import { Grid, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

const TodoComponent: React.FunctionComponent = () => {
  const classes = useStyles();
  const todo = StoreContainer.useContainer();
  const [active, setActive] = useState(false);

  const toggleSquare = () => {
    setActive(!active);
  }

  return (
    <div style={{ padding: 90 }}>
      <p>Add Todos</p>
      <input type="text" value={todo.item} onChange={todo.handleTodo} />
      <button onClick={todo.handleSubmit}>Add</button>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Dear {todo.name}, here are your current tasks
          </Typography>
        <div className={classes.demo}>
          <List dense={true}>
            {todo.todos ? todo.todos.map((item) => {
              console.log('the item ', item)
              return (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                  />
                </ListItem>
              );
            }) : null}
          </List>
        </div>
      </Grid>

      <button onClick={todo.clearItems}>Clear List</button>

      <button onClick={toggleSquare}>{active ? 'Hide' : 'Show'} Square</button>

      {active ? <Square /> : null}
    </div>
  );
};
export default TodoComponent;