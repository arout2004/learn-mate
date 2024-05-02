const express = require("express");
const getAllCategories = require("../controllers/category/getAllCategories");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const addCategory = require("../controllers/category/addCategory");
const { body, param } = require("express-validator");
const updateCategory = require("../controllers/category/updateCategory");
const deleteCategory = require("../controllers/category/deleteCategory");
const getCategory = require("../controllers/category/getCategory");

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:id", [
    param("id","Invalid Category ID").isLength({min: 24, max: 24}),
], getCategory);

router.post("/", [
    body("name", "Category name cannot be empty").exists()
], fetchUser, grantAccess("createAny", "category"), addCategory);

router.put("/:id", [
    param("id","Invalid Category ID").isLength({min: 24, max: 24}),
    body("name", "Category name cannot be empty").exists()
], fetchUser, grantAccess("updateAny", "category"), updateCategory);

router.delete("/:id", [
    param("id","Invalid Category ID").isLength({min: 24, max: 24}),
], fetchUser, grantAccess("deleteAny", "category"), deleteCategory);

module.exports = router;