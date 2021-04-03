import {conn} from './config';

class Accounts {
  static addAccount(accountData) {
    return new Promise((resolve, reject) => {
      conn.post(`/accounts`, accountData)
        .then(data => {
          console.log("resolved")
          resolve(data);
        })
        .catch(data => {
          console.log("rejected)")
          alert(data);
          reject(data);
        })
    });
  }
}

export default Accounts;