import { Popover } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: (window.innerWidth / 2),
  },
});


const Post = props => {
  const [anchorEl,setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () =>{
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return(
    <>
      <button aria-describedby={id} onClick ={handleClick}>
        <img src="https://via.placeholder.com/150"></img>

      
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference ="anchorPosition"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorPosition = {
          {
            top: (window.innerHeight / 4),
            left: (window.innerWidth / 6),
          }
        }
      >


        <img src="https://via.placeholder.com/150"></img>
        <p>insert your description here for the Post</p>
        <p>Will need to be bounded</p>
      </Popover>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference ="anchorPosition"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorPosition = {
          {
            top: (window.innerHeight / 4),
            left: ((window.innerWidth / 6)*3),
          }
        }
      >
        <p>
          This is where the comments will be
          Both will need to be bounded
        </p>
      </Popover>
    </>);
}

export default Post