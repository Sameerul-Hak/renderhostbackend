const mongoose = require("mongoose");

const Messageshema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const messagemodel=mongoose.model("MessageModel",Messageshema)

module.exports=messagemodel;