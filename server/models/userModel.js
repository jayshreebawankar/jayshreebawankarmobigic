const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name is required'],
        // unique: true
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        // unique: true,
        // trim: true,
        // match: [
        // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        // 'invalid email'],
    },
    photo: {
        type: String,
        // require: [true, 'photo is required'],
        default: '',
    },
    phone: {
        type: String,
        default: '+91',
    },
    bio: {
        type: String,
        // maxLength: [100, 'bio must contain 100 characters'],
        default: 'bio',
    },
    password: {
        type: String,
        require: [true, 'password is required'],
        // minLength: [8, 'password must contains 8 characters'],
        // maxLength: [8, 'password must contains 8 characters'],
    },
}, {
    timestamps: true,
}
);

//Encrypt password before saving to db
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    //hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;