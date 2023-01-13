const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Token = require('../models/tokemModel');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, photo, phone, bio } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please fill required details...');
        }

        // const userExist = await User.findOne({ email });
        // if (userExist) {
        //     res.status(400);
        //     throw new Error('Email already exist');
        // }

        // if (password.length > 8) {
        //     res.status(400);
        //     throw new Error('Password must be atmost 8 characters');
        // }

        //Create new user
        const user = await User.create({
            name,
            email,
            password,
            photo,
            phone,
            bio
        });

        //Generate Token
        const token = generateToken(user._id);

        console.log(token);
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            signed: true,
            sameSite: 'none',
        });

        if (user) {
            const { _id, name, email, photo, phone, bio } = user;
            res.status(201).json({ _id, name, email, photo, phone, bio, token });
        } else {
            res.status(400).json('Kindly fill up all data');
        }
    } catch (err) {
        console.log(err);
        // res.status(400).json('something wend wrong');
    }
}

const loginUser = asyncHandler(async (req, res, next) => {
    // try {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add email and password');
    }

    //Check if user exist
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400);
        throw new Error('User not found, Please signup');
    }

    //If user exist, check password
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        res.status(400);
        throw new Error('Incorrect Password');
    }

    //Generate Token
    const token = generateToken(user._id);

    res.cookie('token', token, {
        signed: true,
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
    });

    //send response
    if (user && checkPassword) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({ _id, name, email, photo, phone, bio, token });
    } else {
        res.status(400).json('Something went Wrong');
    }
    // }
    // catch (e) {
    //     console.log(e);
    // }
})


//logout user
const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        signed: false,
        expires: new Date(0),
        sameSite: 'none'
    })
    return res.status(200).json({ message: 'Logged out' });
});


const getUserById = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({ _id, name, email, photo, phone, bio });
    } else {
        res.status(400).json('User not found');
    }
})

const getAllUsers = async (req, res, next) => {
    try {
        const completeData = await User.find();
        // console.log(completeData);
        res.json(completeData);
    } catch (err) {
        console.log(err);
        // res.status(400).json('Error while getting all data');
    }
}

const loginStatus = asyncHandler(async (req, res, next) => {
    try {
        const token = req.signedCookies.token;
        if (!token) {
            return res.json(false);
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            return res.json(true);
        }
        return res.json(false);

    } catch (err) {
        res.send(err);
    }
})

const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.name = req.body.name || name;
        user.email = req.body.email || email;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;

        // let user1 = new User(req.body)
        // const updatedUser = await user1.save(req.body);

        const updatedUser = await user.save();
        res.status(200).json({
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
        })
    } else {
        res.status(400);
        res.json('User not updated...');
    }

    console.log(user);
})

const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldpassword, password } = req.body;

    if (!user) {
        res.status(400);
        throw new Error('User not found, please signup...');
    }

    //validate
    if (!oldpassword || !password) {
        res.status(400);
        throw new Error('Please add old and new password');x
    }
    //check if password matchs to the password in DB
    const passwordIsCorrect = await bcrypt.compare(oldpassword, user.password);
    // console.log('passwordIsCorrect', passwordIsCorrect);

    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();

        res.status(200).send({message: 'Password Updated Successfully'});
    } else {
        res.status(404);
        throw new Error('Please enter valid password');
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    //Delete token if it exists in DB
    const token = await Token.findOne({ userId: user._id })
    if (token) {
        await token.deleteOne();
    }

    //create reset token
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    //hashed token before saving to DB
    const hashedToken = crypto.createHash('SHA256').update(resetToken).digest("hex");

    // save token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresIn: Date.now() + 30 * (60 * 100) //Thirty minute
    }).save();

    //Construct reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    //Reset password email
    const message = `
        <h2> Hello ${user.name} </h2>
        <p> Please use the url below to reset your password </p>
        <p> This reset link is valid for only 30 minutes </p>
        <a href=${resetUrl} clicktracking=off >${resetUrl}</a>
        <p> Regards...</p>
        <p> Pinvent Team </p>
    `
    const subject = 'Password Reset Request';
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: 'Reset Email sent' });
    } catch (e) {
        res.status(500);
        throw new Error('Error while sending Reset email, Please try again...')
    }
})


const basicController = (req, res, next) => {
    res.send('growing') //response will be send successfully before handling error but this is bad 
    if (!req.body.email) {
        res.status(400);
        throw new Error('Please add an Email Address');
    }
    // res.send('growing')
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserById,
    getAllUsers,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};