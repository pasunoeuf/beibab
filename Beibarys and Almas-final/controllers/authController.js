const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body; // ✅ Исправлено: name → username
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ 
            username,  // ✅ Теперь это правильно
            email, 
            password: hashedPassword,
            role: role || "customer"  // Если роль не передана, будет "customer"
        });
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};

// Группировка товаров по категориям
exports.getProductsByCategory = async (req, res) => {
    try {
        const result = await Product.aggregate([
            { $group: { _id: "$category", totalProducts: { $sum: 1 } } }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Разворачивание массива тегов у товаров
exports.getUnwoundTags = async (req, res) => {
    try {
        const result = await Product.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Группировка товаров по ценовым диапазонам
exports.getProductsByPriceRange = async (req, res) => {
    try {
        const result = await Product.aggregate([
            { $bucket: {
                groupBy: "$price",
                boundaries: [0, 50, 100, 200, 500, 1000],
                default: "1000+",
                output: { count: { $sum: 1 } }
            }}
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
