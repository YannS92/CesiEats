const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant");

router.get("/", restaurantController.getAllRestaurant);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/owner/:id", restaurantController.getRestaurantByIdOwner);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;