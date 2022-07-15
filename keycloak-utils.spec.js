const {getRouters} = require("./keycloak-utils");
const path = require("path");
const fs = require("fs");

describe('keycloak-utils', () => {
  it('getRouters', () => {
    const configPath = path.resolve(__dirname, "./keycloak.json");
    const config = JSON.parse(fs.readFileSync(configPath));
    const paths = config["policy-enforcer"].paths;
    expect(paths[0]).toMatchObject({
      name: expect.any(String),
      path: expect.any(String),
      methods: expect.anything(),
    });
    const keycloakEnforcer = jest.fn().mockReturnValue((req, res) => res.status(200).send("OK"));
    const routers = getRouters(paths, keycloakEnforcer);
    expect(routers).toBeInstanceOf(Array);
    expect(routers[0]).toMatchObject({
      name: 'GET /api/settings',
      path: '/api/settings',
      methods: 'GET',
      keycloakPermission: ['web-map-settings:view'],
      router: expect.anything(),
    });

    expect(keycloakEnforcer.mock.calls[0][0]).toMatchObject(["web-map-settings:view"]);
    expect(keycloakEnforcer.mock.calls[1][0]).toMatchObject(["web-map-settings:edit"]);
    expect(keycloakEnforcer.mock.calls[2][0]).toMatchObject(["web-map-organizations:view"]);
    expect(keycloakEnforcer.mock.calls[2][1]).toMatchObject({
      claims: expect.anything(),
    });

    const app = require('express')();
    routers.forEach(router => app.use(router.router));
  });

});
