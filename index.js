let express = require('express');
let Gpio = require('onoff').Gpio;
let dotenv = require('dotenv');

dotenv.config();
 
const app = express();

let state = {
    '1': '0',
    '2': '0',
    '3': '0',
    '4': '0'
};

const pins = {
    '1': new Gpio(22, 'out'),
    '2': new Gpio(23, 'out'),
    '3': new Gpio(24, 'out'),
    '4': new Gpio(25, 'out'),
}
  
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  if(req.query['id']){
    if (Object.keys(state).includes(req.query['id'])){
      state[req.query['id']] = state[req.query['id']] == "0" ? "1" : "0";
      state['4'] = String(getPower());
    }
  } else {

  }
  updateToState()
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

const updateToState = () => {
  Object.keys(state).forEach(element => {
      pins[element].writeSync(Number.parseInt(state[element]));
  });
};

const getPower = () => {
  let p = 0;
  Object.keys(state).forEach(element => {
    if(element !== '4'){
      p += Number.parseInt(state[element]);
    }
  });
  return (p > 0) ? 1 : 0;
}