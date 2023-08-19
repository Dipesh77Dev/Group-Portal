const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema;

const userRegisterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 5,
        max: 10,
    },
    lastName: {
        type: String,
        trim: true,
        min: 5,
        max: 10,
        require: true,
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    // password: {
    //     type: String,
    //     // required,
    // },
    hashPassword: {
        type: String,
        require: true,
    },
    contactNumber: {
        type: String,
        min: 5,
        max: 10
    },
    address: {
        type: String,
        min: 10,
        max: 200
    },
    profilePicture: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, {
    timestamps: true
});

//For get fullName from when we get data from database
userRegisterSchema.virtual("fullName").get(function () {
    // return `${this.firstName} ${this.lastName} ${this.password} ${this.hashPassword}`;
    return `${this.firstName} ${this.lastName}`;
});

userRegisterSchema.method({
    async authenticate(password) {
        return bcrypt.compare(password, this.hashPassword);
    },
});


// userRegisterSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.hashPassword);
// };

module.exports = mongoose.model("UserRegister", userRegisterSchema);



/*
const RegisterModel = mongoose.model('UserRegister', userRegisterSchema);
module.exports = RegisterModel;
*/