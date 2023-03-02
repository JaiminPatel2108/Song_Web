const express = require("express")
const app = express()
const path = require("path")
require("./db/connection")
const Register = require("./models/user")
const authRoute = require("../routes/authRoutes")
const cookieparser = require("cookie-parser")
const {requireAuth,checkuser} = require("../middleware/authmiddleware")
const port = process.env.PORT || 4000


const views_path = path.join(__dirname, "/templates")
const static_path = path.join(__dirname, "../public")
console.log(static_path);

app.set("view engine", "ejs")
app.set("views", views_path)

//middleware
app.use(express.static(static_path))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

app.get("*",checkuser)
app.get("/", (req, res) => {
    res.render("home")
    // res.send("welcome to the original spotify created by jaimin")
})

app.get("/arijit",requireAuth, (req, res) => {
    res.render("arijit")
})
app.get("/yoyo",requireAuth, (req, res) => {
    res.render("yoyo")
})
app.get("/pritam",requireAuth, (req, res) => {
    res.render("pritam")
})
app.get("/kishore",requireAuth, (req, res) => {
    res.render("kishore")
})
app.use(authRoute)

app.listen(port, () => {
    console.log("your original vbvbvbvb spotify server is running on port 4000");
})




