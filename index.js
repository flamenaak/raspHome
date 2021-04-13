let express = require('express');
let Gpio = require('onoff').Gpio;
let dotenv = require('dotenv');

dotenv.config();
 
const app = express();

const state = {
    '1': '0',
    '2': '0',
    '3': '0',
    '4': '0',
};

const pins = {
    '1': new Gpio(1, 'out'),
    '2': new Gpio(2, 'out'),
    '3': new Gpio(3, 'out'),
    '4': new Gpio(4, 'out'),
}
  
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  if(req.query['id']){
    state[req.query['id']] = state[req.query['id']] == "0" ? "1" : "0";
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

setInterval(() => {
  Object.keys(state).forEach(element => {
    pins[element].writeSync(Number.parseInt(state[element]));
  });
},500);