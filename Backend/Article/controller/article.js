const articleModel = require("../model/article");
const { connect } = require("../database/article")

// Get all article
exports.getAllArticle = async (req, res) => {
  try {
    const article = await articleModel.find();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific article by id
exports.getArticleById = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const article = new articleModel(req.body);
    const newArticle = await article.save();
    res.status(201).json({newArticle , message: "Article ajouté."});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit an article
exports.updateArticle = async (req, res) => {
  try {
    const article = await articleModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (article) {
      res.status(200).json({article, message: "Article modifié."});
    } else {
      res.status(404).json({ message: "Article non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleModel.findByIdAndDelete(req.params.id);
    if (article) {
      res.status(200).json({ message: "Article supprimée avec succès" });
    } else {
      res.status(404).json({ message: "Article non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

