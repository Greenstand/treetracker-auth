// intercept http
const https = require('https');
const request = https.request;
https.request = (...args) => {
  console.warn('https.request is called:', args);
  console.error("mock https:");
  return request(...args)
};
const http = require('http');
const requestHttp = http.request;
http.request = (...args) => {
  console.warn('http.request is called:', args);
  console.error("mock http:");
  return requestHttp(...args)
};

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

console.warn("keycloak!:", keycloak);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api/settings', (req, res, next) => {
  console.warn("GET /settings...");
  console.log("request: " + req.url);
  //console.log("req: ",req);
  console.log("original url:", req.originalUrl);
  console.log("path:", req.path);
  console.log("query:", req.query);
  console.log("body:", req.body);
  console.log("params:", req.params);
  console.log("method:", req.method);
  console.log("headers:", req.headers);
  next();
}, 
  keycloak.enforcer('web-map-settings:view'), 
  (req, res) => {
  try{
    console.warn("GET /settings...");
    res.status(200).json({ ok: true });
  }catch(e){
    console.error("GET /settings error:", e);
    res.status(500).json({ ok: false, error: e });
  }
})

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





