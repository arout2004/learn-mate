const roles = require("../roles");

const grantAccess = (action, resource) => {
  let success = false;
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have permission to perform this action",
        });
      }
      next();
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  };
};

module.exports = grantAccess;