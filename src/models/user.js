const mongoose = require("mongoose")
const { isEmail } = require("validator")

const userschema = new mongoose.Schema({

    email: {
        type: String,
        // // required: [true, "please enter the email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        // required: [true, "please enter the password"],
        // minlength: [6, "the minimum length of the password is 6 characters"]
    }

})

//static method to login newuser
// userschema.statics.login = async function (email, password) {
//     const user = await this.findOne({email})
//     if(user){
//         if(password == user.password){
//             return user
//         }
//         throw error("incorrect password")
//     }
//     throw error("incorrect email")
// }

const newUser = new mongoose.model("newuser", userschema)

module.exports = newUser