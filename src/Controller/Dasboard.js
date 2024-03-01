


import userModel from "../Model/userModel.js";

//count user

export const countUser=async(req,res)=>{
    try {
    const {user_id}=req.user;
    const admin=await userModel.findOne({_id:user_id,userType:"admin"});

    if(!admin){
        return res.status(400).json({
            success:false,
            message:"admin not found"
        })
    }

    const count=await userModel.countDocuments({_id:{$ne:user_id}});

    if(!count){
        return res.status(400).json({
            success:false,
            message:"user not count"
        })
    }
     
    return res.status(200).json({
        success:true,
        message:"user count successfully",
        data:count
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//android users

export const getAndroidUsers=async(req,res)=>{
    try {
    const {user_id}=req.user;
    const admin=await userModel.findOne({_id:user_id,userType:"admin"});

    if(!admin){
        return res.status(400).json({
            success:false,
            message:"admin not found"
        })
    }

    const androiduser=await userModel.countDocuments({_id:{$ne:user_id},deviceType:'android'});

      
    if(androiduser.length===0){
        return res.status(400).json({
            success:false,
            message:"android users not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:"android users found successfully",
        data:androiduser
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//ios users

export const getIosUsers=async(req,res)=>{
    try {
        const {user_id}=req.user;
    const admin=await userModel.findOne({_id:user_id,userType:"admin"});

    if(!admin){
        return res.status(400).json({
            success:false,
            message:"admin not found"
        })
    }

    const iosuser=await userModel.countDocuments({_id:{$ne:user_id},deviceType:"ios"});

    if(iosuser.length===0){
        return res.status(400).json({
            success:false,
            message:"ios users not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"ios users found successfully",
        data:iosuser
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//web users

export const getWebUsers=async(req,res)=>{
    try {
        const {user_id}=req.user;
        const admin=await userModel.findOne({_id:user_id,userType:"admin"});
    
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }

        const getwebuser=await userModel.countDocuments({_id:{$ne:user_id},deviceType:"web"});

        if(!getwebuser.length===0){
            return res.status(400).json({
                success:false,
                message:"web users not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"web users found successfully",
            data:getwebuser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}