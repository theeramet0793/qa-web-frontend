import axios from 'axios'

const Client = axios.create({
  baseURL : 'https://findovie-lvg4jtksiq-as.a.run.app',
  //baseURL : 'https://web-production-e1a7.up.railway.app',
  //baseURL : 'http://127.0.0.1:5555',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
  // .. other options
});

export default Client;

export const MLServer = axios.create({
  baseURL : 'https://findovieml-lvg4jtksiq-as.a.run.app',
  //baseURL : 'https://web-production-e1a7.up.railway.app',
  //baseURL : 'http://127.0.0.1:5556',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
  // .. other options
});