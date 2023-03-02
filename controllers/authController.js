const newUser = require("../src/models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//handel errore
// const handleError = (error)=>{
//     console.log(error.message,error.code);
//     let errors = {emali:"", password:""}

//     if(error.code === 11000){
//         errors.email = "that email is already registed"
//         return errors
//     }

//     if(error.message.includes("user validation failed")){
//         Object.values(error.errors).forEach(({properties})=>{
//             errors[properties.path] = properties.message
//         })
//     }
//     return errors
// }

const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
    return jwt.sign({ id }, "jaiminiloveyou", {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render("signup")
}
module.exports.login_get = (req, res) => {
    res.render("login")
}
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    // const hashpassword = await bcrypt.hash(password, 9)
    try {
        const user = await newUser.create({ email, password })

        //here the createtoken is the function name which is defined above
        // console.log(user._id.toString());
        console.log(user);
        const token = await createtoken(user._id.toString())
        res.cookie("jaimin", token, { maxAge: 1000 * 60 * 30 })

        res.redirect("/")

    } catch (error) {
        const EM = error.message
        if (EM.includes("E11000 duplicate key")) {
            res.send("this email is already registered")
        }
    }
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    console.log(password);
    const user = await newUser.findOne({ email })
    if (user) {
        if (password == user.password) {
            const token = createtoken(user._id)
            res.cookie("jaimin", token, { maxAge: 1000 * 60 * 30 })
            res.redirect("/")
        }
        else {
            res.send("password are wrong")
        }
    }
    else {
        res.send("user is not valid")
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("jaimin", "", { maxAge: 1 })
    res.redirect("/")

}