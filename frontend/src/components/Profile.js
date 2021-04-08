import React, { useState } from 'react';
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
import PostAPIs from '../routes/postAPIs';
import Post from './Post';
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
  //let numPictures=11;
  //let pictures=["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"];
 //let bools=[0,0,0,0,0,0,0,0,0,0,0,0];
 //props will have account id  
 class PoSt{
   constructor(image, likes){
     this.image=image;
     this.likes=likes;
   }
 }
 let postA=new PoSt("https://via.placeholder.com/150",10);
 let postB=new PoSt("https://via.placeholder.com/150",12);
 let postC=new PoSt("https://via.placeholder.com/150",1);
 let postD=new PoSt("https://via.placeholder.com/150",10);
 let state = {
  userName: 'Will_Dunn',
  bio: 'This is a sample page',
  //pictures:["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
  pictures:[postA,postB,postC,postD],
  followers: 10,
  following: 12
};
const Profile =(props)=>{
  /*const loadprofile = (props) => {
    const hasFalse = false;
    if (!hasFalse) {
      Posts.getAccountPosts(props)
        .then(console.log("Login Successful!"))
        .catch(console.log("Wrong username/password"));
    }
  }*/
    var root;
    const classes = useStyles();
    //let numPictures
    const [values, setValues] = useState({
      userName: 'Will_Dunn',
      bio: 'This is a sample page',
      //pictures:["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
      //length:12,
      pictures:[postA,postB,postC,postD],
      followers: 10,
      following: 12
    });
   
    function FormRow() {
      let items=[];
     
      /*for (var  = 0; j < values.pictures.length; j+=3) {
        items[i]=<React.Fragment>
        
        <Grid item xs={4} >
          <Card>
            <CardActionArea>
              <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height={300}
              width={300}
              image={values.pictures[i].image}
              title="Userpost #"/>
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {values.pictures[i].likes+" Likes"}
          </Typography>
        
        </CardContent>
             </Card>
          
       
        </Grid>
        <Grid item xs={4}>
        <Card>
            <CardActionArea>
              <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height={300}
              width={300}
              image={values.pictures[i+1].image}
              title="Userpost #"/>
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {values.pictures[i+1].likes+" Likes"}
          </Typography>
        
        </CardContent>
             </Card>
          
        </Grid>
       
        <Grid item xs={4}>
        <Card>
            <CardActionArea>
              <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height={300}
              width={300}
              image={values.pictures[i+2].image}
              title="Userpost #"/>
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {values.pictures[i+1].likes+" Likes"}
          </Typography>
        
        </CardContent>
             </Card>
          
        </Grid>
        </Grid>
      </React.Fragment>
      }*/
      return <Grid  item container xs={100} spacing={0} >{
        values.pictures.map((x,i)=> <Grid item xs={4} key={ i }>
          <Post image={x.image}likes={x.likes} root={this.root}/>
          </Grid>)}
      </Grid>
  
     
     
    }
    root=<Grid container component="main" maxWidth="80vw" className={classes.grid} spacing={2}> 
    <loadprofile/>
    <Grid className={classes.logo} item xs={12}>
      <img src="https://via.placeholder.com/150x50"></img>
    </Grid>
   
    <Grid className={classes.profilepicgrid } item xs={2} rs={3} spacing={30}>
      <img src="https://via.placeholder.com/150"></img>
    </Grid>
    <Grid id="info" item container xs={4}  spacing={1}>
      <Grid item xs={5} >
        <Paper className={classes.paper}>{state.userName}</Paper>
      </Grid>
      <Grid item xs={5} >
        <Button className={classes.editButton}>Edit Profile</Button>
      </Grid>
      <Grid item xs={5} rs={1}>
        <Paper className={classes.paper}>{state.followers}</Paper>
      </Grid>
      <Grid item xs={5} rs={1}>
        <Paper className={classes.paper}>{state.following}</Paper>
      </Grid>
 
  </Grid>
  
 
 
  <Grid item xs={5} rs={3}>
    <Paper className={classes.paper}>{state.bio}</Paper>
  </Grid>
  <Grid item xs={12} rs={2}></Grid>
  <Grid item xs={12}>
    <FormRow />
  </Grid>

  </Grid>;
    return(
        root

    );
}
export default Profile