const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const { param, body } = require("express-validator");
const getLectureContent = require("../controllers/content/getLectureContent");
const getContent = require("../controllers/content/getContent");
const addContent = require("../controllers/content/addContent");
const updateContent = require("../controllers/content/updateContent");
const deleteContent = require("../controllers/content/deleteContent");

const router = express.Router();

router.get("/:id", [
    param("id","Invalid lecture ID").isLength({min: 24, max: 24})
], fetchUser, grantAccess("readOwn", "content"), getLectureContent);

router.get("/get/:id", [
    param("id","Invalid content ID").isLength({min: 24, max: 24})
], fetchUser, grantAccess("readAny", "content"), getContent);

router.post("/:id", [
    param("id","Invalid lecture ID").isLength({min: 24, max: 24}),
    body("contentTitle", "Content title cannot be empty").exists(),
    body("contentDescription", "Content description cannot be empty").exists(),
], fetchUser, grantAccess("createAny", "content"), addContent);

router.put("/:id", [
    param("id","Invalid content ID").isLength({min: 24, max: 24}),
    body("contentTitle", "Content title cannot be empty").exists(),
    body("contentDescription", "Content description cannot be empty").exists(),
], fetchUser, grantAccess("updateAny", "content"), updateContent);

router.delete("/:id", [
    param("id","Invalid content ID").isLength({min: 24, max: 24}),
], fetchUser, grantAccess("deleteAny", "content"), deleteContent);

module.exports = router;