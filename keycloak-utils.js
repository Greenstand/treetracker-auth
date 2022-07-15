const express = require('express');
// generate express routers by config
//
//      {
//        "name": "web-map-settings",
//        "path": "/api/settings",
//        "methods": [
//          {
//            "method": "GET",
//            "scopes": [
//              "view"
//            ]
//          },
//          {
//            "method": "POST",
//            "scopes": [
//              "edit"
//            ]
//          }
//        ]
//      },
function getRouters(paths, keycloakEnforcer){
  // router
  // {
  //   name: "GET /api/settings",
  //   path: "/api/settings",
  //   methods: "GET",
  //   keycloakPermission: "web-map-settings:view",
  //   router: express.Router()
  //  }
  // router object
  //
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
  const routers = [];
  paths.forEach(path => {
    const {name:resourceName, path:pathStr, methods} = path;
    methods.forEach(method => {
      const {method:methodStr, scopes} = method;
      const permissions = scopes.map(scope => `${resourceName}:${scope}`);
      const router = express.Router();
      let claimCustom = undefined;
      if(pathStr.indexOf(":") >= 0){
        console.warn("there is param in the path, convert to claim");
        claimCustom = {
          claims: function (request) {
            let custom;
            if(request.params){
              custom = [Object.values(request.params).join(",")];
            }else{
              console.error("param is required");
            }
            console.warn("claim custom:", custom);
            return {
              custom,
            }
          }
        }
      }

      router[methodStr.toLowerCase()](pathStr, keycloakEnforcer(permissions, claimCustom), (req, res) => {
        res.status(200).json({ ok: true });
      });
      routers.push({
        name: `${methodStr} ${pathStr}`,
        path: pathStr,
        methods: methodStr,
        keycloakPermission: permissions,
        router: router
      });
    });
  });
  return routers;
}

//export
module.exports = {
  getRouters,
}
