const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for a menu
const menuSchema = new Schema({
  idRestaurant: { type: String, required: true},
  name: { type: String, required: true },
  content: { type: String, required: true},
  articles: [
    {
      name: { type: String, required: true},
      content: { type: String, required: true},
      imageURL: { type: String, required: true},
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
    }
  ],  
  imageUrl: { type: String, required: true},
  price: { type: Number, required: true }
});

const menuModel = mongoose.model('menu', menuSchema);
module.exports = menuModel;

