require("dotenv").config();
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const express = require("express");

const app = express();
connectDB().then(() => {
    console.log("DB TEST COMPLETE");
});

app.use(express.static("public"));
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});