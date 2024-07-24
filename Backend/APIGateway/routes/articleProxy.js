const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// Get all article
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.articleMicroserviceURL}/article`);
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving article:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific article
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.articleMicroserviceURL}/article/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add article
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.articleMicroserviceURL}/article`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update article
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await axios.put(
      `${config.articleMicroserviceURL}/article/${id}`,
      {
        status
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete article
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.articleMicroserviceURL}/article/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;