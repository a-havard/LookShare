import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Popover } from '@material-ui/core'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"

const useStyles = makeStyles({
    navDisplayFlex: {
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
    { title: `Explore`, path: `/explore` },
    { title: `My Profile`, path: `/profile` },
]
const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                    <Home fontSize="large" />
                </IconButton>
                {/* Add code */}
                <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navDisplayFlex} // this
                >
                    <a href={'/explore'} key={'Explore'} className={classes.linkText}>
                    <ListItem button>
                            <ListItemText primary={'Explore'} />
                    </ListItem>
                </a>
                    <a href={'/profile/' + localStorage.loggedInId} key={'My Profile'} className={classes.linkText}>
                        <ListItem button>
                            <ListItemText primary={'My Profile'} />
                        </ListItem>
                    </a>
                </List>
                {/* Add code end */}
            </Toolbar>
        </AppBar>       
    )
}
export default Header

