const express = require('express');
const app = express();
const bodyParser = require('body-parser');
console.log("starting...");

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("*", (req, res, next) => {
  console.log("request: " + req.url);
  console.log("403, bad request");
  res.status(403).send("bad request");
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!!');
});





