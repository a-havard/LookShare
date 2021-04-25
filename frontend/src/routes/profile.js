import Axios from 'axios';
import { useParams } from 'react-router';
import {conn} from './config';


class Profile {
  /*static addAccount(accountData) {
    return new Promise((resolve, reject) => {
      conn.post("/accounts", accountData)
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          alert(res);
          reject(res);
        })
    });
  }*/
 
  static getProfile(id) {
     
    const profileConn=Axios.create({
       
        baseURL: "http://localhost:8000",
        
        
    });
    let temp;
   // let temp=Axios.get("http://localhost:8000/accounts/"+id);
    //const profileData= getData.data
    profileConn.get("/accounts/3")
        .then((res) => {
            

            console.log(res.data);
           //temp=JSON.parse(res.data);
            return res.data;
           // resolve(res);
          })
          .catch((res) => {
           console.log(res);
            return{}
            //reject(res);
          })
    return temp;
    
}
}

export default Profile;