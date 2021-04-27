import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import UserSearch from './UserSearch.js'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
        '&:hover': {
            textDecoration:'none',
            color:'white'
        }
    }
});

const Header = () => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => history.push('/explore')}>
                    <Home fontSize="large" />
                </IconButton>
                <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navDisplayFlex} 
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
                <UserSearch/>
                </List>
            </Toolbar>
        </AppBar>       
    )
}
export default Header

