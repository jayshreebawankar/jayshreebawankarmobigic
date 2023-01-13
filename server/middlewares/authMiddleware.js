const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const Protect = async (req, res, next) => {
    try {
        const token = req.signedCookies.token;

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, Kindly login...')
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //GET id from verified token
        const user = await User.findById(verified.id).select('-password');

        if (!user) {
            res.status(401);
            throw new httpError('User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = {
    Protect,
}