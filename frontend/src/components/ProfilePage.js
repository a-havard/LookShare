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
      marginLeft: theme.spacing(1)
      
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
    marginLeft:'10%'}
    
  }))

 
 
var loaded=false;
const ProfilePage =()=>{
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

 
useEffect(() => {
  console.log(par);
  var id=parseInt(par.id);
  var logged=''+localStorage.getItem('loggedInId');
  console.log(logged);
  if (!username) {
   
    conn.get("/accounts/"+par.id,{params:{loggedInId : logged}})
    .then((res) => {
        console.log(res.data);

        setUsername(''+res.data.data.username);
        if(res.data.data.bio)
          setBio(''+res.data.data.bio);
        if(res.data.data.bioLink)
          setBioLink(''+res.data.data.bioLink);
        if(res.data.data.followers)
        setFollowers(res.data.data.followers);
        if(res.data.data.following)
        setFollowing(res.data.data.following);
       
        
        loaded=true;
      })
      .catch((res) => {
      
      })
  conn.get("/posts/authors/"+par.id,{params:{loggedInId : localStorage.getItem('loggedInId')}})
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
 function openFollowing(){
  setSFLL(true);
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
      //setAnchorEl(event.currentTarget);
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
    Followers:{followers.length}
  </Button>
    <Popover
      id={id}
      open={showFollowerList}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        style: { width: '20%',
        height:'70vh'},
        }}
    >
        <ul className="list-group">
        {
            followers.map((x, i) => <div><a href={'/profile/'+x.userId}><button onClick={()=>{console.log(x)}}>{x.username }</button></a><br/></div>
         )
        }
     </ul>
    </Popover></div>;
    return (
      pop
    ); 
    
  }
  function FollowingList(){
    const handleClick = (event) => {
      //setAnchorEl(event.currentTarget);
      console.log("click");
      if(!showFollowingList)
        setSFLL(true);
      
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSFLL(false);
    };
  
    const open = showFollowingList;
    const id = open ? 'simple-popover' : undefined;
    let pop=<div><Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
    Following: {following.length}
  </Button>
    <Popover
      id={id}
      open={showFollowingList}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        style: { width: '20%',
        height:'70vh'},
        }}
    >
        <ul className="list-group">
        {
            following.map((x, i) => <Grid container><Grid item xs={5}><a href={'/profile/'+x.userId}><button onClick={()=>{console.log(x)}}>{x.userId }</button></a></Grid><Grid item xs={2}><button>Unfollow</button></Grid></Grid>
         )
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
    
    const handleClick = (event) => {
      //setAnchorEl(event.currentTarget);
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
      PaperProps={{
        style: { width: '70%',
        height:'70vh'},
        }}
    >
      <form>
      <label for="link">Link</label>
      <input
                        type="text"
                        name="link"
                        id="link"
                        className={classes.bioLink}
                        
                        onChange={ event => {temp2=( event.target.value )} } 
                        />
    <br/>
    <label for="Bio">Bio</label><br/>
     <textarea
                        
                        name="Bio"
                        id="Bio"
                        className={classes.bioText}
                        rows={10}
                        onChange={ event => {temp=( event.target.value )} } 
                        />
                        <br/>
      <button
                            type="button"
                            className={classes.formButton}
                            onClick={ () => updateBio(temp,temp2) }>
                            Add
                        </button>            
     </form>
    </Popover></div>;
    if(par.id!=localStorage.getItem('loggedInId'))
      return <></>;
    return (
      pop
    );
  }

  function addPost (formData){
    //console.log(file);
    let reader = new FileReader();
    let inFile = formData.file;
    if(!inFile){
      alert("No Photo");
      return;
    }
    //console.log(inFile);
    //console.log("add Post");
    reader.onloadend = () => {
      console.log(reader.result);
      let t= {authorId: par.id,
        instructions: formData.instructions,
        lookDifficulty: formData.lookDifficulty,
        lookKind: formData.lookKind,
        lookTime: formData.lookTime,
        photo: reader.result,
        products: formData.products,
       }
        
      
        conn.post('/posts/post',t)
          .then((res)=>{console.log(res)
            conn.get("/posts/authors/"+par.id,{params:{loggedInId : localStorage.getItem('loggedInId')}})
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
      //setAnchorEl(event.currentTarget);
      if(!popOpen)
      setPosting(true);
      
    };
  
   
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let pop=<div><Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
    Add New Post
  </Button>
    </div>;
     if(par.id!=localStorage.getItem('loggedInId'))
     return <></>;
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
      /*let file='';
      let instructionlist='';
      let lookkind='';
      let difficulty=0;*/
      let formData= {
        instructions: "",
        lookDifficulty: 1,
        lookKind: "",
        lookTime: 0,
        file: '',
        products: "",
       };
    
      let ratings=[1,2,3,4,5,6,7,8,9,10];
    const handleClose = () => {
      setAnchorEl(null);
      setPosting(false);
    };
    if(par.id!=localStorage.getItem('loggedInId'))
    return <></>;
      return <Popover 
      className={classes.overlay}
      
      open={addingPost}
      anchorPosition={{left: '0vw',top: '0vh'}
      }
  
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        horizontal: 'center'
      }}
      
      PaperProps={{
      style: { width: '70%',
      height:'70vh'},
      }}
    >
     <h1>Please Enter the information for your new post</h1>
     <form className={classes.forms}>
     <Grid container  maxWidth="80vw" className={classes.grid} spacing={2}>
      <Grid item xs={12} >
        <label for='photo'>Select Photo:   </label><br/>
      <input
                        type="file"
                        name="photo"
                        id="photo"
                        className={classes.formControl}
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={ event => {formData.file=( event.target.files[0])} } 
                    
                        />
                        </Grid>
      <Grid item xs={12} >
        <label for='instructions'>Please List Your Instructions:  </label><br/>
      <textarea
                        type="text"
                        name="Instructions"
                        id="instructions"
                        className={classes.formControl}
                        ref={fileInput}
                        onChange={ event => {formData.instructions=(event.target.value)} } 
                    
                        />
                        </Grid>
          <Grid item xs={5} >
        <label for='kind'>What type of look:  </label><br/>
      <input
                        type="text"
                        name="kind"
                        id="kind"
                        className={classes.formControl}
                        
                        ref={fileInput}
                        onChange={event => {formData.lookKind=( event.target.value)}} 
                    
                        />
                        </Grid>
          <Grid item xs={5} >
            <label for='products'>Time to do in minutes:  </label><br/>
              <input
                        type="number"
                        min={0}
                        name="products"
                        id="products"
                        className={classes.formControl}
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={event => {formData.lookTime=( event.target.value)}} 
                    
                        />
                        </Grid>                        
        <Grid item xs={1} >
        <label for='difficulty'>Look Difficulty:  </label><br/>
            <select
                        type="select"
                        name="difficulty"
                        id="difficulty"
                        className={classes.formControl}
                    
                        ref={fileInput}
                        onChange={ event => {formData.lookDifficulty=(event.target.value )} } 
                    
                        >
                         {
                                    ratings.map((x, i) => <option key={ i }>{ x }</option>)
                                }</select>
                        </Grid>
          
                        
      <Grid item xs={12} >
        <label for='products'>Products:  </label><br/>
        <textarea
                      
                        name="products"
                        id="products"
                        className={classes.formControl}
                        //onChange={handleImageChange}
                        ref={fileInput}
                        onChange={event => {formData.products=( event.target.value)}} 
                    
                        />
                        </Grid>
                        
     
                        <Grid item xs={12} >
                        <button
                            type="button"
                            className={classes.formButton}
                            onClick={ () => addPost(formData) }>
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
      
      
      return <Grid  item container xs={100} spacing={1} className={classes.postsGrid}>{
        posts.map((x,i)=> 
        <Grid item xs={4} key={ i }>
          <Post post={x}/>
          </Grid>)
         
    }</Grid>
  
     
     
    }
   const hc=(event)=>{
    setAnchorEl(event.currentTarget);
   }
    return(
      <>
    
      <PostingPopover/>
     
      <Grid className={classes.logo} item xs={12}>
      
      
      </Grid>
      
<Card className={classes.bio}>
  
       
  <CardContent className={classes.bioInfo}>
  <Grid container component="main" maxWidth="80vw" className={classes.grid} spacing={2}> 
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
        <Grid item xs={6} rs={1}>
          <Paper className={classes.paper} onClick={hc}><FollowerList/></Paper>
        </Grid>
        <Grid item xs={5} rs={1}>
          <Paper className={classes.paper} onClick={hc}><FollowingList/></Paper>
        </Grid>
   
    </Grid>
    
   
   
    <Grid item xs={5} rs={3}>
      
      <Card className={classes.paper} >
        <CardContent>
        <p>{bio}</p>
        <a href={bioLink}>My Link: {bioLink}</a>
        </CardContent>
       
        
        </Card>
    </Grid>
    </Grid>
    </CardContent>
    
    </Card>
    <Grid container component="main" maxWidth="80vw" className={classes.grid} spacing={2}> 
    <Grid item xs={12} rs={2}></Grid>
    <FormRow className={classes.postsGrid}/>
    <Grid item xs={12} rs={2}><PostInformationForm/></Grid>
    </Grid>
    
</>
    );
}

export default ProfilePage