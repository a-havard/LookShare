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

import {conn} from '../routes/config'

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
    postPicture:{
      width: '100%',
    },
    profilePic:{
      borderRadius: '50%',
    },
    forms:{
      width:'100%',
      height:'100%'
      
      
    },
    
  }))

 
 
var loaded=false;
const ProfilePage =(props)=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [params,setParams]=React.useState(null);
var par=useParams();
  let fileInput = React.createRef(); 
  let temp;
  let [username,setUsername]=useState(null);
  let [bio,setBio]=useState('');
  let [bioLink,setBioLink]=useState('');
  let [followers,setFollowers]=useState([]);
  let [following,setFollowing]=useState([]);
  let [posts,setPosts]=useState([]);
  let [popOpen,setPopOpen]=useState();
  let [addingPost,setPosting]=useState();
  const [showFollowerList,setSFL]=useState();
  const [dataUri, setDataUri] = useState('');
  const [values, setValues] = useState([]);

 
useEffect(() => {
  //console.log(par);
  var id=parseInt(par.id);
  if (!username) {
   
    conn.get("/accounts/"+par.id,{params:{loggedInId : props.loggedInId}})
    .then((res) => {
        //console.log(res.data);

   
        setUsername(''+res.data.data.username);
        setBio(''+res.data.data.bio);
        setBioLink(''+res.data.data.bioLink);
        if(res.data.data.followers)
        setFollowers(res.data.data.followers);
        if(res.data.data.following)
        setFollowing(res.data.data.following);
       
        
        loaded=true;
      })
      .catch((res) => {
      
      })
  conn.get("/posts/authors/"+par.id,{params:{loggedInId : props.loggedInId}})
    .then((res) => {
      //console.log(res.data.data);
      setPosts(res.data.data);
      
   
      //console.log(posts);
      var pics=[];
      let i=0;
    

    
    });
    
   
   
  }
});
 function openFollowers(){
   setSFL(true);
 }
  function getPictures(){
    console.log(posts);
    let pics=[];
    let i=0;
  for( i=0;i<posts.length;i++){
    console.log(posts[i].photo);
    var arrayBufferView = new Uint8Array( posts[i].photo.data );
      var blob = new Blob( [arrayBufferView]);
  
      var imageUrl = URL.createObjectURL( blob );
      var reader = new FileReader();
      let y;
      reader.onload = function() {
         // alert(reader.result);
          y=reader.result;
          pics.push(y);
      }
      reader.readAsText(blob);
  }
  setValues(pics);
  //console.log(pics);
  }
  /*
  */
  const classes = useStyles();
    //let numPictures
  function FollowerList(){
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log("click");
      if(!showFollowerList)
        setSFL(true);
      
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSFL(false);
    };
  
    const open = showFollowerList;
    const id = open ? 'simple-popover' : undefined;
    let pop=<div><Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
    Followers: {followers.length}
  </Button>
    <Popover
      id={id}
      open={showFollowerList}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
        <ul className="list-group">
        {
            followers.map((x, i) => <li className="list-group-item" key={ i }>
          <Link to={ '/'}>{x.firstName }</Link></li>)
        }
     </ul>
    </Popover></div>;
    return (
      pop
    ); 
    
  }
  function updateBio (newBio,newLink){
    setBio(newBio);
    setBioLink(newLink);
    conn.put("/accounts/"+par.id+"/bio",{bio: newBio, bioLink:newLink})
    .then((res)=>{console.log(res)})
    .then(setPopOpen(false));
  }
  function BioForm(){
     let temp='';
     let temp2='';
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      if(!popOpen)
        setPopOpen(true);
      
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setPopOpen(false);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let pop=<div><Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
    Edit Bio
  </Button>
    <Popover
      id={id}
      open={popOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <form>
      <label for="link">Link</label>
      <input
                        type="text"
                        name="link"
                        id="link"
                        className="form-control"
                        
                        onChange={ event => {temp2=( event.target.value )} } 
                        />
    <br/>
    <label for="Bio">Bio</label>
     <input
                        type="text"
                        name="Bio"
                        id="Bio"
                        className="form-control"
                        
                        onChange={ event => {temp=( event.target.value )} } 
                        />
                        <br/>
      <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={ () => updateBio(temp,temp2) }>
                            Add
                        </button>            
     </form>
    </Popover></div>;
    return (
      pop
    );
  }

  function addPost (file){
    //console.log(file);
    let reader = new FileReader();
    let inFile = file;

    //console.log(inFile);
    //console.log("add Post");
    reader.onloadend = () => {
      console.log(reader.result);
      let t= {authorId: par.id,
        instructions: "There's literally nothing to do because there's nothing there!",
        lookDifficulty: 1,
        lookKind: "invisible",
        lookTime: 0,
        photo: reader.result,
        products: "No products",
       }
        
      
        conn.post('/posts/post',t)
          .then((res)=>{console.log(res)
            conn.get("/posts/authors/"+par.id,{params:{loggedInId : props.loggedInId}})
          .then((res) => {
            //console.log(res.data.data);
             t=res.data.data;
            
            setPosts(t);
          });});
        
        
   };
  reader.readAsDataURL(inFile);

    
  }
  function PostInformationForm(){
    
    
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      if(!popOpen)
      setPosting(true);
      
    };
  
   
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let pop=<div><Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
    Add New Post
  </Button>
    </div>;
    return (
      pop
    );
  }
  const handleClick = (event) => {
    //setAnchorEl(event.currentTarget);
    if(!popOpen)
    setPosting(true);
    
  };
    function PostingPopover(){
      let file='';
      let instructionlist='';
      let lookkind='';
      let difficulty=0;
    
      let ratings=[1,2,3,4,5,6,7,8,9];
    const handleClose = () => {
      setAnchorEl(null);
      setPosting(false);
    };
      return <Popover 
      className={classes.overlay}
      
      open={addingPost}
      anchorPosition={{left: '0vw',top: '0vh'}
      }
  
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
     
    >
     
     <form className={classes.forms}>
      <Grid>
       
      <Grid item xs={12} >
        <label for='instructions'>Please List Your Instructions:  </label><br/>
      <input
                        type="text"
                        name="Instructions"
                        id="instructions"
                        className="form-control"
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={ event => {instructionlist=( event.target.value)} } 
                    
                        />
                        </Grid>
          <Grid item xs={5} >
        <label for='kind'>What type of look:  </label><br/>
      <input
                        type="text"
                        name="kind"
                        id="kind"
                        className="form-control"
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={event => {lookkind=( event.target.value)}} 
                    
                        />
                        </Grid>
        <Grid item xs={5} >
        <label for='photo'>Look Difficulty:  </label><br/>
      <select
                        type="select"
                        name="photo"
                        id="Instructions"
                        className="form-control"
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={ event => {difficulty=(event.target.value )} } 
                    
                        >
                         {
                                    ratings.map((x, i) => <option key={ i }>{ x }</option>)
                                }</select>
                        </Grid>
      <Grid item xs={12} >
        <label for='photo'>Select Photo:   </label><br/>
      <input
                        type="file"
                        name="photo"
                        id="photo"
                        className="form-control"
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={ event => {file=( event.target.files[0])} } 
                    
                        />
                        </Grid>
                        <Grid item xs={12} >
                        <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={ () => addPost(file) }>
                            Post it
                        </button> 
                          </Grid>
      </Grid>
     
   
                
     </form>
    </Popover>
    }
    function ShowImg(val){
      //console.log(val);
      const [pic, setPic] = useState('');
     
        useEffect(()=>{
          if(!pic){
            bufferToImage();
          }
        },[]);
        const bufferToImage= async ()=>{
          var arrayBufferView = new Uint8Array( val.val.data );
          var blob = new Blob( [arrayBufferView]);
        
         var imageUrl = URL.createObjectURL( blob );
         var reader = new FileReader();
         let y;
         reader.onload = function() {
            // alert(reader.result);
            //console.log(reader.result);
             setPic(reader.result);
             
         }
         reader.readAsText(blob);
        }
     return <img src={pic} className={classes.postPicture}/>;
      
    }
    function FormRow() {
      let items=[];
      
      
      return <Grid  item container xs={100} spacing={0} >{
        posts.map((x,i)=> 
        <Grid item xs={4} key={ i }>
          <Card className={classes.root}>
            <CardActionArea>
           
            <CardContent>
              <ShowImg val={x.photo}/>
              </CardContent>
          </CardActionArea>
          </Card>
          </Grid>)
         
    }</Grid>
  
     
     
    }
   
    return(
      <>
      <PostingPopover/>
      <Grid container component="main" maxWidth="80vw" className={classes.grid} spacing={2}> 
       
      <Grid className={classes.logo} item xs={12}>
      
      
      </Grid>
     
      <Grid className={classes.profilepicgrid } item xs={2} rs={3} spacing={30}>
        <img src="https://via.placeholder.com/150" className={classes.profilePic}></img>
    
      </Grid>
      <Grid id="info" item container xs={4}  spacing={1}>
        <Grid item xs={5} >
          <Paper className={classes.paper}>{username}</Paper>
        </Grid>
        <Grid item xs={5} >
          <BioForm/>
        </Grid>
        <Grid item xs={5} rs={1}>
          <Paper className={classes.paper}><FollowerList/></Paper>
        </Grid>
        <Grid item xs={5} rs={1}>
          <Paper className={classes.paper}>{following.length}</Paper>
        </Grid>
   
    </Grid>
    
   
   
    <Grid item xs={5} rs={3}>
      
      <Paper className={classes.paper}><a href={bioLink}>{bioLink}</a><p>{bio}</p></Paper>
    </Grid>
    <Grid item xs={12} rs={2}></Grid>
    <FormRow/>
    <Grid item xs={12} rs={2}><PostInformationForm/></Grid>
    </Grid>
    
</>
    );
}

export default ProfilePage