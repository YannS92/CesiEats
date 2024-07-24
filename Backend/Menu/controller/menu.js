const menuModel = require("../model/menu");
const { connect } = require("../database/menu")

// Get all menu
exports.getAllMenu = async (req, res) => {
  try {
    const menu = await menuModel.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific menu by id
exports.getMenuById = async (req, res) => {
  try {
    const menu = await menuModel.findById(req.params.id);
    if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new menu
exports.createMenu = async (req, res) => {
  try {
    const menu = new menuModel(req.body);
    const newMenu = await menu.save();
    res.status(201).json({newMenu , message: "Menu ajouté."});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit an menu
exports.updateMenu = async (req, res) => {
  try {
    const menu = await menuModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (menu) {
      res.status(200).json({menu, message: "Menu modifié."});
    } else {
      res.status(404).json({ message: "Menu not found." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await menuModel.findByIdAndDelete(req.params.id);
    if (menu) {
      res.status(200).json({ message: "Menu successfully deleted." });
    } else {
      res.status(404).json({ message: "Menu not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

