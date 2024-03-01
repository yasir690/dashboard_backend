import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

userName:{
type:String
},

userEmail:{
    type:String,
    required:true
},

userPassword:{
    type:String

},
userType:{
    enum:['user','admin','provider'],
    type:String
},
deviceType:{
    enum:['ios','android','web'],
    type:String
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
}



});


const userModel=mongoose.model('users',userSchema);

export default userModel;