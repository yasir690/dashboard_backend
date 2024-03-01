import mongoose from "mongoose";
import vehicleModel from "../Model/vehicleModel.js";



//create vehicle

export const createVehicle = async (req, res, next) => {
    try {
      
      const {make,model,vehicleType}=req.body;
 
      if(!make){
        return res.status(400).json({
          success:false,
          message:"make not provide"
        })
      }
      if(!model){
        return res.status(400).json({
          success:false,
          message:"model not provide"
        })
      }
      if(!vehicleType){
        return res.status(400).json({
          success:false,
          message:"vehicleType not provide"
        })
      }

      const createvehicle =  new vehicleModel({
        make,
        model,
        vehicleType,
      });

      const save=await createvehicle.save();

      if (!save) {
        return res.status(400).json({
          success:false,
          message:"vehicle not create"
        })
      }

      return res.status(200).json({
        success:true,
        message:"vehicle create successfully",
        data:save
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }

//get vehicles


export const getVehicle = async (req, res) => {
  try {
    const getvehicle = await vehicleModel.find();

    if (!getvehicle || getvehicle.length===0) {
      return res.status(400).json({
        success:false,
        message:"vehicles not found"
      })
    }
      return res.status(200).json({
        success:true,
        message:"vehicles found successfully",
        data:getvehicle
      })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

//update vehicle
export const updateVehicle = async (req, res,) => {
    try {
  
      const { id } = req.params;
      const {make,model,vehicleType}=req.body;

      const updateVehicle = await vehicleModel.findByIdAndUpdate(
        id,
        {
          make,
          model,
          vehicleType
        },
        { new: true }
      );
      console.log(updateVehicle);
      if (!updateVehicle) {
        return res.status(400).json({
          success:false,
          message:"vehicle not update"
        })
      }

      return res.status(200).json({
        success:true,
        message:"vehicle update successfully",
        data:updateVehicle
      })
      
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }

//delete vehicle

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);

    const vehicle = await vehicleModel.findById(id);
    console.log("Found Vehicle:", vehicle);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle ID not found",
      });
    }

    const deleteResult = await vehicleModel.findByIdAndDelete(id);

    if (!deleteResult) {
      // findByIdAndDelete returns null if no document was found to delete
      return res.status(404).json({
        success: false,
        message: "Vehicle not found for deletion",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: deleteResult,
    });
  } catch (error) {
    console.error("Error in deleteVehicle:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








