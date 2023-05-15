const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

router.get("/", ctrl.users.index);
router.get("/:index", ctrl.users.show);
router.post("/", ctrl.users.postUser);
router.delete("/:index", ctrl.users.removeUser);
router.put("/:index", ctrl.users.editUser);

module.exports = router;
