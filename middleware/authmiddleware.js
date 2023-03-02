const jwt = require("jsonwebtoken")
const User = require("../src/models/user")
// hbs.localsAsTemplateData(app)

//authanticate the user
const requireAuth = (req,res,next)=>{
    const token = req.cookies.jaimin
    console.log(token);
    // res.redirect("/login")
    if(token){
        jwt.verify(token,"jaiminiloveyou", async(err,decodedtoken)=>{
            if(err){
                console.log("require auth token ma error 6");
                res.redirect("/login")
            }
            else{
                console.log("requireuth token barabr 6");
                const user = await User.findById(decodedtoken.id)
                console.log(user);
                next()
            }
        })
        
    }else{
        console.log("require auth token nathi");
        res.redirect("/login")
    }
}

// check currentuser
const checkuser = (req, res, next) => {
    const token = req.cookies.jaimin
    if (token) {
        jwt.verify(token, "jaiminiloveyou", async (err, decodedtoken) => {
            if (err) {
                console.log("token is not verified");

                res.locals.user = null
                // console.log(user);
                next()
            }
            else {
                // console.log("here this is your token");
                // console.log(decodedtoken.id);
                const user = await User.findById(decodedtoken.id)
                res.locals.user = user
                console.log(user);
                next()
            }
        })
    }
    else {
        console.log("there is no token available");

        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth,checkuser}
