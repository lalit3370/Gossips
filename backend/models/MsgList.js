const mongoose=require('mongoose');

const MsgListSchema=new mongoose.Schema({
    boardid:  {
        type: String,
        required: true
    },
    id:     {
        type: String,
        required: true
    },
    date:   {
        type: Date,
        required: true,
        default: Date.now
    },
    content:   {
        type: String,
        required: true
    }
});

const MsgList=mongoose.model('MsgList',MsgListSchema);
module.exports=MsgList;