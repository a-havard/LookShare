import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    profilepicgrid:{
      marginLeft: theme.spacing(4),
    },
    editButton:{
      backgroundColor:"brown",
      padddingTop: theme.spacing(1),
    },
    grid:{
      marginTop: theme.spacing(0),
      
    },
    logo:{
      float: "center",
      marginLeft: theme.spacing(0),
    },
    picture:{
      width: "90%",
      paddingBottom: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    
  }))
  let numPictures=11;
  let pictures=["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"];
 
const Profile =()=>{
    const classes = useStyles();
    function FormRow() {
      let items=[];
      for (var i = 0; i < numPictures; i+=3) {
        items[i]=<React.Fragment>
        <Grid  item container xs={100} spacing={0} >
        <Grid item xs={4}>
          <img className={classes.picture} src={pictures[i]}></img>
          
        </Grid>
        <Grid item xs={4}>
          <img className={classes.picture} src={pictures[i+1]}></img>
          
        </Grid>
       
        <Grid item xs={4}>
          <img className={classes.picture} src={pictures[i+2]}></img>
          
        </Grid>
        </Grid>
      </React.Fragment>
      }
      return (
       items
      );
    }
    return(
        <Grid container component="main" maxWidth="80vw" className={classes.grid} spacing={2}> 
          <Grid className={classes.logo} item xs={12}>
            <img src="https://via.placeholder.com/150x50"></img>
          </Grid>
         
          <Grid className={classes.profilepicgrid } item xs={2} rs={3} spacing={30}>
            <img src="https://via.placeholder.com/150"></img>
          </Grid>
          <Grid id="info" item container xs={4}  spacing={1}>
            <Grid item xs={5} >
              <Paper className={classes.paper}>the_rock</Paper>
            </Grid>
            <Grid item xs={5} >
              <Button className={classes.editButton}>Edit Profile</Button>
            </Grid>
            <Grid item xs={5} rs={1}>
              <Paper className={classes.paper}>xs=2 rs=1 Followers</Paper>
            </Grid>
            <Grid item xs={5} rs={1}>
              <Paper className={classes.paper}>xs=2 rs=1 Following</Paper>
            </Grid>
       
        </Grid>
        
       
       
        <Grid item xs={5} rs={3}>
          <Paper className={classes.paper}>xs=6 rs=3 Bio</Paper>
        </Grid>
        <Grid item xs={12} rs={2}></Grid>
        <Grid item xs={12}>
          <FormRow />
        </Grid>
      
        </Grid>

    )
}
export default Profile