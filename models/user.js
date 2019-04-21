const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model
const User = mongoose.model('user', usersSchema);

// Export model
module.exports = User;
