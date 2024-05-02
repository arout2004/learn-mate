const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const getCourses = require("../controllers/course/getCourses");
const addCourse = require("../controllers/course/addCourse");
const { param, body } = require("express-validator");
const updateCourse = require("../controllers/course/updateCourse");
const deleteCourse = require("../controllers/course/deleteCourse");
const getCourse = require("../controllers/course/getCourse");
const getAllCourses = require("../controllers/course/getAllCourses");

const router = express.Router();

router.get("/", getAllCourses);

router.get(
  "/:id",
  [param("id", "Invalid category ID").optional().isLength({ min: 24, max: 24 })],
  getCourses
);

router.get(
  "/get/:id",
  [param("id", "Invalid course ID").isLength({ min: 24, max: 24 })],
  getCourse
);

router.post(
  "/:id",
  [
    param("id", "Invalid category ID").isLength({ min: 24, max: 24 }),
    body("name", "Course name cannot be empty").exists(),
    body("description", "Course description cannot be empty").exists(),
    body("mrp", "Invalid MRP").isFloat({ min: 1 }),
    body("salePrice", "Invalid sale price").isFloat({ min: 1 }),
    body("thumbnail", "Course thumbnail cannot be empty").exists(),
  ],
  fetchUser,
  grantAccess("createAny", "course"),
  addCourse
);

router.put(
  "/:id",
  [
    param("id", "Invalid course ID").isLength({ min: 24, max: 24 }),
    body("name", "Course name cannot be empty").exists(),
    body("description", "Course description cannot be empty").exists(),
    body("mrp", "Invalid MRP").isFloat({ min: 1 }),
    body("salePrice", "Invalid sale price").isFloat({ min: 1 }),
    body("thumbnail", "Course thumbnail cannot be empty").exists(),
  ],
  fetchUser,
  grantAccess("updateAny", "course"),
  updateCourse
);

router.delete(
  "/:id",
  [param("id", "Invalid course ID").isLength({ min: 24, max: 24 })],
  fetchUser,
  grantAccess("deleteAny", "course"),
  deleteCourse
);

module.exports = router;
