const path = require("path");
const fs = require("fs");
// ignore ssl verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
// intercept http
const {ClientRequestInterceptor} = require("@mswjs/interceptors/lib/interceptors/ClientRequest");
interceptor = new ClientRequestInterceptor();

// Listen to any "http.ClientRequest" being dispatched,
// and log its method and full URL.
interceptor.on('request', (request) => {
  console.warn("xxx  inte request:", request.method, request.url.href)
  console.warn("request:", request);
})

// Listen to any responses sent to "http.ClientRequest".
// Note that this listener is read-only and cannot affect responses.
interceptor.on('response', (response, request) => {
  console.warn('xxx interceptor responce',
    'response to %s %s was:',
    request.method,
    //request.url.href,
    response
  )
})

interceptor.apply();

const express = require('express');
const Keycloak = require('./keycloak-connect/keycloak');
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

// load routers for keycloak
const configPath = path.resolve(__dirname, "./keycloak.json");
const config = JSON.parse(fs.readFileSync(configPath));
const paths = config["policy-enforcer"].paths;
const keycloakEnforcer = (...arg) => keycloak.enforcer(...arg);
const {getRouters} = require("./keycloak-utils");
const routers = getRouters(paths, keycloakEnforcer);

routers.forEach(router => app.use(router.router));

//app.get(
//  '/api/settings', 
//  keycloak.enforcer('web-map-settings:view'), 
//  (req, res) => {
//  try{
//    console.warn("GET /settings...");
//    res.status(200).json({ ok: true });
//  }catch(e){
//    console.error("GET /settings error:", e);
//    res.status(500).json({ ok: false, error: e });
//  }
//})
//
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





