const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("student")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .readAny("course")
    .readAny("lecture")
    .readOwn("content")
    .readOwn("purchase")
    .createOwn("purchase");

  ac.grant("admin")
    .extend("student")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")
    .createAny("category")
    .updateAny("category")
    .deleteAny("category")
    .createAny("course")
    .updateAny("course")
    .deleteAny("course")
    .createAny("lecture")
    .updateAny("lecture")
    .deleteAny("lecture")
    .readAny("content")
    .createAny("content")
    .updateAny("content")
    .deleteAny("content")
    .readAny("purchase");

  return ac;
})();

module.exports = roles;