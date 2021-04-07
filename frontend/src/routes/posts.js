import {conn} from './config';

class Posts {
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

export default Posts;