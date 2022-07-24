import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide name'], minLength: 3, maxLength: 20, trim: true},
    email: {type: String, required: [true, 'Please provide email'], validate: {
        validator: isEmail, message: "Please provide a valid email"
        }, unique: true},
    password: {type: String, required: [true, 'Please provide password'], minLength: 3},
    lastName: {type: String, maxLength: 20, trim: true, default: "lastName"},
    location: {type: String, trim: true, maxLength: 20, default: "my city"}
});

export default mongoose.model('User', UserSchema);