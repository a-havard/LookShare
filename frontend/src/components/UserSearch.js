import React from 'react';
import { conn } from '../routes/config';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    searchForm: {
        display: 'flex',
        alignItems: 'center',
    },
    spacing: {
        margin: '0 20px 0 10px'
    },
    textbox: {
        height: '50%',
        borderRadius: '3px',
        outline: 'none',
        border: 'none',
        paddingLeft: '5px'
    },
    btn: {
        borderWidth: 0,
        outline: 'none',
        borderRadius: '2px',
        backgroundColor: '#b3b3b3',
        color: '#ffffff',
        height: '65%',
        width: '100px'
    }
});

const UserSearch = () => {
    const classes = useStyles();
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
            if(id !== -1)
                path+=id;
            else
                path+=localStorage.loggedInId
            history.push(path);
        });
    }
    return <form className={`${classes.searchForm}`}>
        <label className={`${classes.spacing}`}>
            USER SEARCH
        </label>
        <input className={`${classes.spacing} ${classes.textbox}`}
            type="text"
            name="userName"
            id="userName"
           
            onChange={event => { searchData.userName = (event.target.value) }}
        />
        <button
            className={`${classes.spacing} ${classes.btn}`}
            type="button"
            onClick={handleClick}>
                SEARCH
            </button>
    </form>
}
export default UserSearch