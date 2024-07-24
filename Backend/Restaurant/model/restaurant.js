const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for a restaurant
const restaurantSchema = new Schema({
  idOwner: {type: String, required : true},
  name: { type: String, required: true },
  content: { type: String, required: true },
  addressRestaurant: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String },
  },
  imageURL: { type: String},
  openingDays: [
    {
      day: { type: String},
      isOpen: { type: Boolean},
      openHour: { type: String },
      closeHour: { type: String },
    }
  ]
  
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;

