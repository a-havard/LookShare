import {conn} from './config';

class PostAPIs {
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
  static postComment(comment){
    console.log(comment);
    return new Promise((resolve, reject) => {
      conn.post("/comments/comment", comment)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  };
  
  static getAccountPosts(accountId) {
    return new Promise((resolve, reject) => {
      conn.get("/posts/author", accountId)
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        })
    });
  };
}

export default PostAPIs;