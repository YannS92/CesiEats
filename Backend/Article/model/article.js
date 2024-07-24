const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for an article
const articleSchema = new Schema({
  idMenu : { type: String },
  idRestaurant: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type : Array, required: true },
  imageUrl: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  price: { type: Number, required:true }
});

const articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;

