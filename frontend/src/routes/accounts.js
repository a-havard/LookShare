import axios from 'axios';
import {url} from './config';

class Accounts {
  addAccount(accountData) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/accounts`)
        .then(data => {
          resolve(data);
        })
        .catch(data => {
          alert(data);
          reject(data);
        })
    });
  }
}

export default Accounts;