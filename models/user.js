const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

usersSchema.pre('save', async function(next){
    try {
        // generate a salt + hashpassword
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);

        // Assing hash password to original password.
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

usersSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

// Create model
const User = mongoose.model('user', usersSchema);

// Export model
module.exports = User;
