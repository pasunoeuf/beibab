const express = require("express");
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
