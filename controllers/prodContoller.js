const Product = require("../models/prodModel");
const Order = require("../models/orderSchema");

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.productDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ userId }).populate("products.productId");
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

exports.payment = async (req, res) => {
  // Mock payment processing
  const success = Math.random() > 0.1; // 90% success rate
  if (success) {
    res.json({ success: true, message: "Payment successful" });
  } else {
    res.status(400).json({ success: false, message: "Payment failed" });
  }
};
