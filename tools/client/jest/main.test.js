const axios = require('axios')
const Keycloak = require("./keycloak.js");
require("./keycloak-authz.js");

describe("main", () => {

  beforeEach(async () => {
  });

  it("Login", () => {
    console.log("Keycloak class:", Keycloak);
    const keycloak = new Keycloak({
      url: 'https://localhost/auth',
      realm: 'treetracker',
      clientId: 'webmap',
      // realm: 'quickstart',
      // clientId: 'webmap-client',
    });
    console.log("keycloak instance:", keycloak);

  }, 1000*60);

});
