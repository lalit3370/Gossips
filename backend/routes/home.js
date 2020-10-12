const { response } = require('express');
var express = require('express');
var router = express.Router();
const path = require('path');
// var MsgList = require('../models/Board');
const BoardList = require('../models/BoardList.js');
const MsgList = require('../models/MsgList.js');
// var retdata=messages;
router.get('/boardlist/:id',(req,res)=>{
    var id=req.params.id.toLowerCase();
    BoardList.find({},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            var boardlist=result.filter(board=>
                board.boardid.startsWith(id)
            )
            res.json(boardlist);
        }
    })
})
router.get('/boardlist/',(req,res)=>{
    var result=[]
    res.json(result)
    
})
router.get('/msglist',(req,res)=>{
    MsgList.find({},(err,result)=>{
        res.json(result);
    })
})
router.get('/delete/:boardid',(req,res)=>{
    BoardList.deleteOne({boardid:req.params.boardid},(err,result)=>{
        if(err){
            console.log("couldn't delete "+ req.params.boardid)
        }else{
            MsgList.deleteMany({boardid:req.params.boardid},(err,result)=>{
                if(err) {console.log("error: "+ err)}
                else{
                    res.send("deleted "+ req.params.boardid)
                }
            })
        }
    })
})
router.get('/board/:boardid',(req,res)=>{
    MsgList.find({boardid: req.params.boardid},(err,results)=>{
        if(err){
            console.log("errors: \n" + err);
        }
        else{
            res.json(results);
        }
    })
});
router.post('/board/:boardid',(req,res)=>{
    const _boardid=req.params.boardid;
    MsgList.countDocuments({boardid:req.params.boardid},(err,results)=>{
        if(err){
            console.log(err);
        }else{
            const newMsg= new MsgList({
                boardid:req.params.boardid,
                id:results+1,
                date:req.body.date,
                content:req.body.msgcontent
            })
            newMsg.save()
            .then(
                BoardList.find({boardid:_boardid},(err,result)=>{
                    if(err){console.log(err)}
                    else{
                        if(result.length==0){
                            console.log(result)
                            const newBoard=new BoardList({
                                boardid:_boardid
                            })
                            newBoard.save()
                            .then(
                                res.send("msg created")
                            )
                        }
                    }
                })
            )
            .catch(err=>console.log(err))
        }
    });    
});
module.exports = router;