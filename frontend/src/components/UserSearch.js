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
import { conn } from '../routes/config';
import { useHistory } from 'react-router-dom';



const UserSearch = () => {
    const history = useHistory();
    let searchData = {
        userName: "",
        
    }
    let id=-1;
    function handleClick(){
        console.log("click");
      
        conn.get('/accountId',{params:{username:searchData.userName}})
        .then((res)=>{id=res.data.data;
            let path='/profile/'
            if(id!=-1)
                path+=id;
            else
                path+=localStorage.loggedInId
            history.push(path);
        });
    }
    return <form>
        <label>
            User Search
            </label>
        <input
            type="text"
            name="userName"
            id="userName"
           
            onChange={event => { searchData.userName = (event.target.value) }}

        />
        <button
            type="button"
            onClick={handleClick}>
            Go to Account
            </button>
    </form>
}
export default UserSearch