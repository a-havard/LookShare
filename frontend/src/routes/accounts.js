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
    return new Promise((resolve, reject) => {
      conn.post("/accounts/login", accountData)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        })
    });
  };
}

export default Accounts;