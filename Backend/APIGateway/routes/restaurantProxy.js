const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// Get all restaurants
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.restaurantMicroserviceURL}/restaurant`);
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving restaurants:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific restaurant
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Get specific restaurant
router.get("/owner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.restaurantMicroserviceURL}/restaurant/owner/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add restaurant
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.restaurantMicroserviceURL}/restaurant`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update restaurant
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await axios.put(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`,
      {
        status
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;