const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const Product = mongoose.model("Product", prodSchema);

module.exports = Product;
