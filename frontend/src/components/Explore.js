import React, {useEffect, useState } from 'react';
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
import Profile from '../routes/profile';
import { matchPath, useParams } from 'react-router';
import Axios from 'axios';
import Post from './Post';

import { conn } from '../routes/config'
import Header from './NavBar.js'

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
      marginLeft: theme.spacing(1),

      
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
    postPicture:{
      width: '100%',
    },
    profilePic:{
      borderRadius: '50%',
    },
    forms:{
      width:'100%',
      height:'100%',
      border: 10
      
    },
    formControl:{
     
      width:'85%'
    },
    formButton:{
     
      width:'85%'
    },
    bioLink:{
      width:'85%'
    },
    bioText:{
      width:'85%',
      height:'75%'
    },
    bioInfo:{
      width:'80%'
    },
    bio:{
      width:'80%',
      marginLeft:'10%'
    },
    postsGrid:{width:'80%',
    marginLeft:'10%',
    },
    explorePost:{
    }
    
  }))

 
 
var loaded=false;
const ExplorePage =()=>{
  console.log("test");
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [params,setParams]=React.useState(null);
var par=useParams();
  let fileInput = React.createRef(); 
  let temp;
  let [username,setUsername]=useState(null);
  let [bio,setBio]=useState('This account is private!');
  let [bioLink,setBioLink]=useState('');
  let [followers,setFollowers]=useState([]);
  let [following,setFollowing]=useState([]);
  let [posts,setPosts]=useState([]);
  let [popOpen,setPopOpen]=useState();
  let [addingPost,setPosting]=useState();
  let [selectedPost,setSelectedPost]=useState();
  const [showFollowerList,setSFL]=useState();
  const [showFollowingList,setSFLL]=useState();
  const [dataUri, setDataUri] = useState('');
  const [values, setValues] = useState([]);
  const classes = useStyles();
 
useEffect(() => {
  console.log(par);
  var id=parseInt(par.id);
  var logged=''+localStorage.getItem('loggedInId');
  console.log(logged);

  if(posts.length==0){
    conn.get("/posts",{params:{loggedInId : localStorage.getItem('loggedInId')}})
        .then((res) => {
      //console.log(res.data.data);
            setPosts(res.data.data);
      
   
      //console.log(posts);
            var pics=[];
            let i=0;
    

    
    });
    
   
   
  }
});
 
    function FormRow() {
      let items=[];
      
      
      return <Grid  item container xs={100} spacing={3} className={classes.postsGrid}>{
        posts.map((x,i)=> 
        <Grid item xs={4} key={ i }  className= {classes.explorePost}>
          <Post post={x}/>
          </Grid>)
         
    }</Grid>
  
     
     
    }
   const hc=(event)=>{
    setAnchorEl(event.currentTarget);
   }
    return(<>

      <h1> EXPLORE LOOKS</h1>

            <Header/>
      
     <FormRow className={classes.postsGrid}/>
     </>
      
    );
}

export default ExplorePage