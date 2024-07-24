const express = require("express");
const router = express.Router();
const menuController = require("../controller/menu");

router.get("/", menuController.getAllMenu);
router.get("/:id", menuController.getMenuById);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;