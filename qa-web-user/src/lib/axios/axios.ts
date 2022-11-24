import axios from 'axios'

const Client = axios.create({
  baseURL : 'https://qa-website-api.herokuapp.com',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
  // .. other options
});

export default Client;