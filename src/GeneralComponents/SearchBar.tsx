import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme, Grid, IconButton, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface Props {
    value: string;
    searchBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = (props: Props) => {

    const classes = useStyles();
    
    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        value={props.value}
                        onChange={props.searchBarChange}
                        className={classes.input}
                        placeholder="Search Table"
                        inputProps={{ 'aria-label': 'search Table' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SearchBar;