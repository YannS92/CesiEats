const restaurantModel = require("../model/restaurant");
const { connect } = require("../database/restaurant")

// Get all restaurant
exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({}).select('-idOwner');
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific restaurant by id
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id).select('-idOwner');
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific restaurant by id with owner id
exports.getRestaurantByIdOwner = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({idOwner: req.params.id});
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new restaurantModel(req.body);
    const newRestaurant = await restaurant.save();
    res.status(201).json({newRestaurant , message: "Restaurant ajouté."});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (restaurant) {
      res.status(200).json({restaurant, message: "Restaurant modifié."});
    } else {
      res.status(404).json({ message: "Restaurant not found." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete(req.params.id);
    if (restaurant) {
      res.status(200).json({ message: "Restaurant successfully deleted." });
    } else {
      res.status(404).json({ message: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

