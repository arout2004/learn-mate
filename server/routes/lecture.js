const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const getLectures = require("../controllers/lecture/getLectures");
const { param, body } = require("express-validator");
const getLecture = require("../controllers/lecture/getLecture");
const addLecture = require("../controllers/lecture/addLecture");
const updateLecture = require("../controllers/lecture/updateLecture");
const deleteLecture = require("../controllers/lecture/deleteLecture");

const router = express.Router();

router.get("/:id", [
    param("id", "Invalid course ID").isLength({min: 24, max: 24})
], getLectures);

router.get("/get/:id", [
    param("id", "Invalid lecture ID").isLength({min: 24, max: 24})
], getLecture);

router.post("/:id", [
    param("id", "Invalid course ID").isLength({min: 24, max: 24}),
    body("title", "Title cannot be empty").exists(),
    body("description", "Description cannot be empty").exists(),
], fetchUser, grantAccess("createAny","lecture"), addLecture);

router.put("/:id", [
    param("id", "Invalid lecture ID").isLength({min: 24, max: 24}),
    body("title", "Title cannot be empty").exists(),
    body("description", "Description cannot be empty").exists(),
], fetchUser, grantAccess("updateAny","lecture"), updateLecture);

router.delete("/:id", [
    param("id", "Invalid lecture ID").isLength({min: 24, max: 24}),
], fetchUser, grantAccess("deleteAny","lecture"), deleteLecture);

module.exports = router;