import axios from 'axios'

const Client = axios.create({
  //baseURL : 'https://qa-website-api.herokuapp.com',
  baseURL : 'https://web-production-e1a7.up.railway.app',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
  // .. other options
});

export default Client;