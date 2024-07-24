const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// Get all users
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.userMicroserviceURL}/user`);
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.userMicroserviceURL}/user/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add user
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.userMicroserviceURL}/user`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await axios.put(
      `${config.userMicroserviceURL}/user/${id}`,
      {
        status
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.userMicroserviceURL}/user/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;