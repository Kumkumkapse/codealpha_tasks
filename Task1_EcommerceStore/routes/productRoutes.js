const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Wireless Headphones",
            price: 1499
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 2999
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 1999
        }
    ]);
});

module.exports = router;