const { response } = require('express');
var express = require('express');
var router = express.Router();
const path = require('path');
// const messages = require('../public/MsgList.js');
var MsgList = require('../models/MsgList');
// var retdata=messages;

router.get('/',(req,res)=>{
    MsgList.find({},(err,results)=>{
        if(err){
            console.log("errors: \n" + err);
        }
        else{
            console.log("results:");
            console.log(results);
            res.json(results);
        }
    })
    // res.send("OK");
});
router.post('/',(req,res)=>{
    MsgList.countDocuments({},(err,results)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results);
            const id=results+1;
            const date=req.body.date
            const content=req.body.msgcontent
            const newMsg= new MsgList({
                id,
                date,
                content
            })
            newMsg.save()
            .then(
                res.send("msg created")
            )
            .catch(err=>console.log(err))
        }
    });    
});
module.exports = router;