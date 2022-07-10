const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
console.log("starting...");



app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get("*", (req, res, next) => {
  console.log("request: " + req.url);
  //console.log("req: ",req);
  console.log("original url:", req.originalUrl);
  console.log("path:", req.path);
  console.log("query:", req.query);
  console.log("body:", req.body);
  console.log("params:", req.params);
  console.log("method:", req.method);
  console.log("headers:", req.headers);
  res.status(200).send("OK");
});

app.post("*", (req, res, next) => {
  console.log("request: " + req.url);
  //console.log("req: ",req);
  console.log("original url:", req.originalUrl);
  console.log("path:", req.path);
  console.log("query:", req.query);
  console.log("body:", req.body);
  console.log("params:", req.params);
  console.log("method:", req.method);
  console.log("headers:", req.headers);
  res.status(201).send("OK");
});

app.listen(3000, () => {
  console.log('Example api listening on port 3000!!');
});





