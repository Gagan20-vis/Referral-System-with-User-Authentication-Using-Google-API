const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: 255,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    number : {
        type: Number,
        require: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
})
const User = mongoose.model('user', UserSchema);
module.exports = User;
