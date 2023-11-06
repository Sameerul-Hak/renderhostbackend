// const express=require("express")
const express = require("express");
const mongoose=require("mongoose")
const app=express();
const  bodyParser = require("body-parser");
const cors = require('cors');
const messagemodel=require("./model/Messagemodel.js");
const usermodel = require("./model/usermodel");
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())



mongoose.connect("mongodb+srv://sameerulhakofficial:giM6IyrtgGxv5wLl@bookstore.dxckmpm.mongodb.net/chatapp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


app.post("/message",(req,res)=>{
    // console.log(req);
    const{code,message}=req.body
    console.log(code,message);

    const newmsg=messagemodel.create({code,message}).then((re)=>{
        console.log(re);
        return res.json({message:"createpannitan"});
    }).catch((err)=>{
        console.log(err);
    })
})
app.get("/message",(req,res)=>{
    const msgs=messagemodel.find().then((sucs)=>{
        console.log(sucs);
        return res.json({"data":sucs}).status(200)
    }).catch((e)=>{
        // console.log(e);
        // return res.json({"data":sucs}).status(400)
    })
})
app.put("/message",(req,res)=>{
    const {mycode,oldmessage,newmsg}=req.body;

    const msgs=messagemodel.updateOne({code:mycode,message:oldmessage},{code:mycode,message:newmsg}).then((sucs)=>{
        console.log(sucs);
        return res.json({"data":"changepannitan"}).status(200)
    }).catch((e)=>{
        // console.log(e);
        return res.json({"data":sucs}).status(400)
    })
})

app.post("/deletemessage",(req,res)=>{
    const {mycode ,mymsg}=req.body
    console.log(req.body);
    console.log(mycode,mymsg);
    const deltedmsg=messagemodel.deleteOne({code:mycode,message:mymsg}).then((suc)=>{
        console.log(`deleted bro`);
        return res.json({"message":"delete pannitan"})
    })
    .catch((e)=>{
        return res.json({"message":"error"}).status(400)
    })
})

app.post("/register",(req,res)=>{
    const{code,password}=req.body
    console.log(req);
    console.log(`${code} ${password} from register page`);
    const user=usermodel.create({code,password}).then((suc)=>{
        return res.json({"message":"sucess","data":suc})
    }).catch((e)=>{
        return res.json({"message":"erro"}).status(400)
    })
})

app.post("/login", async (req, res) => {
    const { code, password } = req.body;
    console.log(code,password);
    try {
        const existinguser = await usermodel.findOne({ code });
        console.log(existinguser);

        if (!existinguser) {
            return res.json({ "message": "User not found" });
        } else {
            if (existinguser.password === password) {
                return res.status(200).json({ "message": "sucess","data":existinguser});
            } else {
                return res.json({ "message": "Invalid password" });
            }
        }
    } catch (e) {
        console.log(`error ${e}`);
        return res.status(500).json({ "message": "Internal server error" });
    }
});


app.listen(5000,()=>{
    console.log("server running on port 4000");
})