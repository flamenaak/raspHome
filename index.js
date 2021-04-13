import express from 'express';
import {Gpio} from 'onoff';
import dotenv from 'dotenv';

dotenv.config();
 
const app = express();

const state = {
    '1': '0',
    '2': '0',
    '3': '0',
    '4': '0',
};
  
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  if(req.params.id){
    state[req.params.id] = state[req.params.id] == "0" ? "1" : "0";
  } else {
    
  }
  return res.send(state);
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);