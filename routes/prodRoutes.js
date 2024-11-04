const express = require("express");
const prodController = require("../controllers/prodContoller");

const router = express.Router();

router.get("/allProducts", prodController.allProducts);
router.get("/desc/:id", prodController.productDetails);
router.post("/orders", prodController.createOrder);
router.get("/orders/:userId", prodController.getOrders);
router.post("/payment", prodController.payment);

module.exports = router;
