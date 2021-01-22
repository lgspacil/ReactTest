import {
    AppBar,
    Container,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar,
  } from "@material-ui/core";
  import { Home } from "@material-ui/icons";
  import * as React from "react";
  import HideOnScroll from "./HideOnScroll";
  import SideDrawer from "./SideDrawer";
  
  const useStyles = makeStyles({
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    navListDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
  });

  const navLinks = [
    { title: `Star Wars`, path: `/starwars` },
    { title: `Form`, path: `/form/Terraclear/Maps` },
    { title: `To Do List`, path: `/todo` },
    { title: `about`, path: `/about` },
  ];
  
  const Header: React.FunctionComponent = () => { 
    const classes = useStyles();
  
    return (
      <>
        <HideOnScroll>
          <AppBar position="fixed" style={{backgroundColor: '#141920'}}>
            <Toolbar component="nav">
              <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                <IconButton edge="start" aria-label="home">
                  <a href="/" style={{ color: `white` }}>
                    <Home fontSize="large" />
                  </a>
                </IconButton>
  
                <Hidden smDown>
                  <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navListDisplayFlex}
                  >
                    {navLinks.map(({ title, path }) => (
                      <a href={path} key={title} className={classes.linkText}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    ))}
                  </List>
                </Hidden>
                <Hidden mdUp>
                  <SideDrawer navLinks={navLinks} />
                </Hidden>
              </Container>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </>
    );
  };
  
  export default Header;
  