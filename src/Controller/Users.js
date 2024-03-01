import userModel from "../Model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//user register

export const userRegister=async(req,res)=>{
    try {
        const {userName,userEmail,userPassword,userType,deviceType}=req.body;
        
        if(!userName){
            return res.status(400).json({
                success:false,
                message:"userName not provide"
            })
        }
        if(!userEmail){
            return res.status(400).json({
                success:false,
                message:"userEmail not provide"
            })
        }
        if(!userPassword){
            return res.status(400).json({
                success:false,
                message:"userPassword not provide"
            })
        }

        if(userType !=='admin' && userType !=='user'){
            return res.status(400).json({
                success:false,
                message:"user type must be admin or user"
            })
        }

        const checkuser=await userModel.findOne({userEmail:userEmail});

        if(checkuser){
            return res.status(400).json({
                success:false,
                message:""
            })
        }
        const create=new userModel({
            userName,
            userEmail,
            userPassword:bcrypt.hashSync(userPassword,10),
            userType,
            deviceType
        });

        const save=await create.save();

        if(!save){
            return res.status(400).json({
                success:false,
                message:"user not save"
            })
        }
        return res.status(400).json({
            success:true,
            message:"user save successfully",
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//user login

export const userLogin=async(req,res)=>{
    try {
        const {userEmail,userPassword}=req.body;
        
     
        if(!userEmail){
            return res.status(400).json({
                success:false,
                message:"userEmail not provide"
            })
        }
        if(!userPassword){
            return res.status(400).json({
                success:false,
                message:"userPassword not provide"
            })
        }

        const user=await userModel.findOne({userEmail:userEmail});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        if(!bcrypt.compareSync(userPassword,user.userPassword)){
            return res.status(400).json({
                success:false,
                message:"password not correct"
            })
        }
        
       
    const Token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
      });

      const response={
        ...user._doc,
        userToken:Token
      }

      return res.status(200).json({
        success:true,
        message:"user login successfully",
        data:response
      })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message,
          })
    }
}

//add user

export const addUser=async(req,res)=>{
    try {
        const {userName,userEmail,userPassword,userType,deviceType}=req.body;
        const {user_id}=req.user;

        const admin=await userModel.findOne({_id:user_id,userType:"admin"});

        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }
        if(!userName){
            return res.status(400).json({
                success:false,
                message:"userName not provide"
            })
        }
        if(!userEmail){
            return res.status(400).json({
                success:false,
                message:"userEmail not provide"
            })
        }
        // if(!userPassword){
        //     return res.status(400).json({
        //         success:false,
        //         message:"userPassword not provide"
        //     })
        // }
        // if(!deviceType){
        //     return res.status(400).json({
        //         success:false,
        //         message:"deviceType not provide"
        //     })
        // }

        if(userType !=='admin' && userType !=='user' && userType !=='provider'){
            return res.status(400).json({
                success:false,
                message:"user type must be admin or user or provider"
            })
        }

        const create=new userModel({
            userName,
            userEmail,
            userPassword,
            userType,
            deviceType,
            createdBy:user_id
        });

        const save=await create.save();
        if(!save){
            return res.status(400).json({
                success:false,
                message:"user not save"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user added successfully",
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get user

export const getUser=async(req,res)=>{
    try {
        const {user_id}=req.user;

        const admin=await userModel.findOne({_id:user_id,userType:"admin"});

        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }

        const getuser=await userModel.find({_id:{$ne:user_id}});

        if(!getuser){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user found successfully",
            data:getuser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//update user

export const updateUser=async(req,res)=>{
    try {
        const {user_id}=req.user;
        const {id}=req.params;
        const {userName,userEmail,userType}=req.body;

        const admin=await userModel.findOne({_id:user_id,userType:"admin"});

        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }

        const userId=await userModel.findById(id);

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user id not found"
            })
        }
        const update=await userModel.findByIdAndUpdate(userId,{
            userName,
            userEmail,
            // userPassword,
            userType,

        },{
            new:true
        });

        if(!update){
            return res.status(400).json({
                success:false,
                message:"user not update"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user update successfully",
            data:update
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//delete user
export const deleteUser=async(req,res)=>{
try {
    const {user_id}=req.user;
    const {id}=req.params;
    const admin=await userModel.findOne({_id:user_id,userType:"admin"});

    if(!admin){
        return res.status(400).json({
            success:false,
            message:"admin not found"
        })
    }
    
    const userId=await userModel.findById(id);

    if(!userId){
        return res.status(404).json({
            success:false,
            message:"user id not found"
        })
    }
     const deleteuser=await userModel.findByIdAndDelete(userId);
     if(!deleteuser){
        return res.status(400).json({
            success:false,
            message:"user not delete"
        })
     }
     return res.status(200).json({
        success:false,
        message:"user delete successfully"
    })
} catch (error) {
    return res.status(500).json({
            success:false,
            message:error.message
        })
}
}

