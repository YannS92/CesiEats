const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// Get all orders
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.orderMicroserviceURL}/order`);
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific order
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.orderMicroserviceURL}/order/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add order
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.orderMicroserviceURL}/order`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update Order
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await axios.put(
      `${config.orderMicroserviceURL}/order/${id}`,
      {
        status
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.orderMicroserviceURL}/order/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;