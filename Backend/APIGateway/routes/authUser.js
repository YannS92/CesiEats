const express = require('express');
const app = express();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/restaurant",
    [authJwt.verifyToken, authJwt.isRestaurant],
    controller.restaurantBoard
  );

  app.get(
    "/api/test/delivery",
    [authJwt.verifyToken, authJwt.isDelivery],
    controller.deliveryBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
