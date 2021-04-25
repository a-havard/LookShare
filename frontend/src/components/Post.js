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
import {Rating} from '../Rating';
import CommentForm from './CommentForm'
import { conn } from '../routes/config';
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
      height:'25vh'
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
    like:{
        height: '10vh'
    },
    popoverPic:{
        width:'40vw'
    }

    
  }))
const Post=props=>{
    let ratings=[1,2,3,4,5,6,7,8,9,10];
    let [accountData,setAccountData]=useState({
        username:'',
        accountId:-1

    })
    let [formData, setFormData]=useState({
        name: '',
        rating: '',
        comment:''
    });
    useEffect(()=> {
        if(accountData.accountId==-1)
    conn.get("/accounts/"+props.post.authorId,{params:{loggedInId : localStorage.loggedInId}})
    .then((res) => {setAccountData({
        username:res.data.data.username,
        accountId:res.data.data.userId
    })})
console.log(accountData)});
    

    console.log(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    let [openPost,setOpen]=useState();
    let instructions=props.post.instructions.split('\n');
    let products=props.post.products.split('\n');
      const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
      };
     
      return (<Card>
        <CardActionArea onClick={()=>{setOpen(true);}}>
       
        <CardContent>
          <ShowImg val={props.post.photo}/>
          </CardContent>
      </CardActionArea>
     
<Popover 
        className={classes.overlay}
        
        open={openPost}
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
          <a href={'/profile/'+accountData.accountId}><button>{accountData.username}</button></a>
          <ShowImg className={classes.popoverPic}val={props.post.photo}/>
          <Grid container  maxWidth="80vw" className={classes.grid} spacing={2}>
            
              <Grid item xs={12}>
                  <p>instructions</p>
                <ol>
                {
                    instructions.map((x, i) => <li className="list-group-item" key={ i }>
                        {x}
                    </li>)
                }
                </ol>
              </Grid>
              <Grid item xs={4}>
                <p>Type of look:{props.post.lookKind}</p>
              </Grid>
              <Grid item xs={4}>
                <p>Time for this look: {props.post.lookTime} minutes</p>
              </Grid>
              <Grid item xs={4}>
                <p>Difficulty: {props.post.lookDifficulty}/10</p>
              </Grid>
              <Grid item xs={12}>
              <p>products</p>
                <ul>
                {
                    products.map((x, i) => <li className="list-group-item" key={ i }>
                        {x}
                    </li>)
                }
                </ul>
              </Grid>
            
          </Grid>
         
          <Grid item xs={12}>
                  <form>
                  <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                       name="comment"
                       value={formData.comment}
                       onChange={event => setFormData({comment: event.target.value})}
                       className="form-control"/>
                       <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={ () => onAddClick() }> submit</button>
                  </form>
                  </Grid>
      </Popover>
      </Card>)
      
    function onAddClick(){
        let rating={
            authorId: props.post.authorId,
            parentPostId:props.post.postId,
            comment:formData.comment,
            parentCommentId:null,
            isRepost:false,
            restricted:false
        }
        PostAPIs.postComment(rating)
            .then((res)=>console.log(res));
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
    return <p>filler</p>;
   
}
export default Post;