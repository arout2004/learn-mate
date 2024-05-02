const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const getMyPurchases = require("../controllers/purchase/getMyPurchases");
const getAllPurchases = require("../controllers/purchase/getAllPurchases");
const { param } = require("express-validator");
const getPurchase = require("../controllers/purchase/getPurchase");
const addPurchase = require("../controllers/purchase/addPurchase");

const router = express.Router();

router.get("/", fetchUser, grantAccess("readOwn","purchase"), getMyPurchases);

router.get("/all", fetchUser, grantAccess("readAny","purchase"), getAllPurchases);

router.get("/get/:id", [
    param("id", "Invalid purchase ID").isLength({min: 24, max: 24})
], fetchUser, grantAccess("readAny","purchase"), getPurchase);

router.post("/:id", [
    param("id", "Invalid course ID").isLength({min: 24, max: 24})
], fetchUser, grantAccess("createOwn","purchase"), addPurchase);

module.exports = router;