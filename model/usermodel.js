const mongoose = require("mongoose");

const usershema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },

})

const usermodel=mongoose.model('Usermodel',usershema);
module.exports=usermodel;