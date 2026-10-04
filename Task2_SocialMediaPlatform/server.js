const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});