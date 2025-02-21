const router = require("express").Router();
const {
    createOrder,
    getUserOrders,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/orderController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");


router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);


router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

module.exports = router;