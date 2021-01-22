import React from "react";
import clsx from "clsx";
import {
    createStyles,
    makeStyles,
    Theme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import MapOutlined from "@material-ui/icons/MapOutlined";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import ListAlt from "@material-ui/icons/ListAlt";
import Info from "@material-ui/icons/Info";
import FormatAlignJustify from "@material-ui/icons/FormatAlignJustify";
import { Tooltip } from "@material-ui/core";
import { StoreContainer } from "../store";
import {useHistory} from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex"
        },
        menuButton: {
            marginRight: 8
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap"
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9) + 1
            }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },
        linkText: {
            textDecoration: `none`,
            textTransform: `uppercase`,
            color: `black`
          }
    })
);

const navLinks = [
    { title: `Home`, path: `/`, icon: <HomeOutlined /> },
    { title: `Map`, path: `/map`, icon: <MapOutlined /> },
    { title: `Star Wars`, path: `/starwars`, icon: <StarBorder /> },
    { title: `Form`, path: `/form/:firstname/:lastname`, icon: <FormatAlignJustify /> },
    { title: `To Do List`, path: `/todo`, icon: <ListAlt /> },
    { title: `about`, path: `/about`, icon: <Info /> },
];

const MiniDrawer: React.FunctionComponent = () => {
    const history = useHistory();
    const store = StoreContainer.useContainer();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerToggle} className={classes.menuButton}>
                        {open ? (
                            <ChevronLeftIcon />
                        ) : (
                            <Tooltip title={'Menu'} aria-label={'menu'}>
                                <MenuIcon />
                            </Tooltip>
                                
                            )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {navLinks.map(({ title, path, icon }) => (
                        <a href={path} key={title} className={classes.linkText}>
                            <ListItem button key={title}>
                                <Tooltip title={title} aria-label={title}>
                                <ListItemIcon key={title}>
                                    {icon}
                                </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={title} />
                            </ListItem>
                        </a>
                    ))}

                </List>
                <Divider />
                <List>
                    <ListItem button key={'Sign Out'}>
                        <Tooltip title={'Sign Out'} aria-label={'Sign Out'}>
                        <ListItemIcon onClick={() => store.handleLogout(() => history.push('/signin'))}>
                            <ExitToApp />
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={'Sign Out'} />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default MiniDrawer;
