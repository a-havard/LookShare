import React, {useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Popover } from '@material-ui/core'
import PostAPIs from '../routes/postAPIs';
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
      margin: '20px auto',
      borderWidth: 0,
      outline: 'none',
      borderRadius: '2px',
      backgroundColor: '#b3b3b3',
      color: '#ffffff',
      height: '50px',
      width: '100px'
    },
    like:{
        height: '10vh'
    },
    popoverPic:{
        width:'40vw'
    },
    formText: {
      fontWeight: 'bold'
    },
    username: {
      color: 'blue',
      textDecoration: 'none',
      fontSize: '30px'
    }
  }))
const Post=props=>{
    let instructions=[];
    let products=[];
    let ratings=[1,2,3,4,5,6,7,8,9,10];
    let [accountData,setAccountData]=useState({
        username:'',
        accountId:-1

    })
    let [comments, setComments]=useState([]);
    let [formData, setFormData]=useState({
        name: '',
        rating: '',
        comment:''
    });
    useEffect(()=> {
         instructions=props.post.instructions.split('\n');
         products=props.post.products.split('\n');
        if(accountData.accountId==-1){
    conn.get("/accounts/"+props.post.authorId,{params:{loggedInId : localStorage.loggedInId}})
    .then((res) => {setAccountData({
        username:res.data.data.username,
        accountId:res.data.data.userId
    })})
    conn.get("/comments/posts/"+props.post.postId)
    .then((res)=>{
        setComments(res.data.data);

    })
}
console.log(accountData)});
    

    console.log(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    let [openPost,setOpen]=useState();
  
      const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
      };
     
      return (
        <Card variant='outlined'>
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
          <Grid container  maxWidth="80vw" className={classes.lookFull} spacing={2}>
            <Grid container xs={3} direction='column' justify='center' alignItems='center'>
              <a href={'/profile/'+accountData.accountId} className={classes.username}>{accountData.username}</a>
              <ShowImg className={classes.popoverPic}val={props.post.photo}/>
            </Grid>
            <Grid container xs direction='column'>
              <Grid item xs className={classes.formText}>
                <ol>
                {
                    instructions.map((x, i) => <li className="list-group-item" key={ i }>
                        {x}
                    </li>)
                }
                </ol>
              </Grid>
              <Grid item xs className= {classes.formText}>
                <p>Type of look:{props.post.lookKind}</p>
              </Grid>
              <Grid item xs className= {classes.formText}>
                <p>Time for this look: {props.post.lookTime} minutes</p>
              </Grid>
              <Grid item xs className = {classes.formText}>
                <p>Difficulty: {props.post.lookDifficulty}/10</p>
              </Grid>
              <Grid item xs className = {classes.formText}>
              <p>Products:</p>
                <ul>
                {
                    products.map((x, i) => <li className="list-group-item" key={ i }>
                        {x}
                    </li>)
                }
                </ul>
              </Grid>          
              <Grid item xs className = {classes.commentGrid}>
                <Grid container direction='column'>
                  <form>
                    <Grid item>
                      <label htmlFor="comment" className={classes.formText}>Comment</label>
                    </Grid>
                    <Grid item>
                     <textarea
                          id="comment"
                          name="comment"
                          value={formData.comment}
                          onChange={event => setFormData({comment: event.target.value})}
                          className="form-control"
                          rows='5' cols='70'
                      />
                    </Grid>
                    <Grid>
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={ () => onAddClick() }>Submit
                      </button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

                  <ul className="list-group">
        <Grid item xs={12}>
            <ul>
        <li className="list-group-item">comments</li>
        {
            (!comments.length) &&
                <li className="list-group-item">No Comments.</li>
        }
        {
            comments.map((x, i) =>
                <li className="list-group-item" key={ i }><Card>
                   
                    <CardContent>
                        <h2><a href={"/profile/"+x.authorId}>username</a></h2>
                        <Typography>{x.comment}</Typography>
                    </CardContent>
                    </Card></li>)
        }
        </ul>
        </Grid>
    </ul>
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
        conn.get("/comments/posts/"+props.post.postId)
            .then((res)=>{
                setComments(res.data.data);
        
            })
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