var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dateCreated:{type:Date,required:true},
    refID:{type:String,required:true,unique:true},
    isAdmin:{type:Boolean,default:false}
});

module.exports = mongoose.model("User", UserSchema);