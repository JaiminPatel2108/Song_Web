const mongoose = require("mongoose")

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/spotifyclone")
.then(()=>{
    console.log("your connection with the compass is success");
})
.catch((e)=>{
    console.log(e);
})