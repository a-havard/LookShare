import {conn} from './config';

class Accounts {
  static addAccount(accountData) {
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
  }

  static getAccount(accountData) {
    console.log("get");
    return new Promise((resolve, reject) => {
      conn.post("/accounts/login", accountData)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  };
}

export default Accounts;