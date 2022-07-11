const express = require('express');
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
console.log("starting...");

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({
  store: memoryStore,
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/settings', keycloak.enforcer('web-map-setting:view'), (req, res) => res.status(200).json({ ok: true }));

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
  console.log("403, bad request");
  res.status(403).send("bad request");
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
  console.log("403, bad request");
  res.status(403).send("bad request for post");
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!!!');
});





