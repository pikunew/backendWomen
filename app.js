const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Load environment variables from .env file
dotenv.config();

// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB connection error:", err));

// MIDDLEWARE
app.use(cors({
    origin: 'https://womenhelpline.in', // Specify the allowed origin
    credentials: true, // Include credentials (cookies, authorization headers) in the CORS requests
}));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());

// ROUTES MIDDLEWARE
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/issuesTypeRoutes'));
app.use('/api', require('./routes/helplineRoutes'));

// Error middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
