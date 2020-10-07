const mongoose=require('mongoose');

const BoardListSchema=new mongoose.Schema({
    boardid:{
        type:String,
        unique: true,
        required: true
    }
});

const BoardList=mongoose.model('BoardList',BoardListSchema);
module.exports=BoardList;