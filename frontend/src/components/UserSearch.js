import React from 'react';
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
            if(id !== -1)
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