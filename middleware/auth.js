const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// Check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route - Token not found', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log('Authentication successful!');
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return next(new ErrorResponse('Not authorized to access this route - Token verification failed', 401));
    }
}

// Middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse('Access denied - You must be an admin', 401));
    }
    console.log('Admin access granted!');
    next();
}
