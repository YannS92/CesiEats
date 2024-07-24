const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema for orders
const orderSchema = new Schema({
  idUser: { type: String},
  idDeliver : {type: String },
  idRestaurant: { type: String},
  shippingAddress: {
    address: { type: String},
    city: { type: String},
    postalCode: { type: String},
    country: { type: String},
  },
  articles: [
    {
      name: { type: String},
      amount: { type: Number},
      content: { type: String},
      imageURL: { type: String},
      price: { type: Number},
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    }
  ],
  status: { type: String, default: 'Pending' },
  dateOrder: { type: Date,  },
  shippingPrice: { type: Number,  },
  totalPrice: { type: Number }
});

const orderModel = mongoose.model('orders', orderSchema);
 module.exports = orderModel;