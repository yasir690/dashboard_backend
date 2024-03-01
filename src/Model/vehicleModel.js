import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({


  make: {
    type: String,
    
  },
    
  model: {
    type: String,
    
  },

  vehicleType: {
    type: String,
    enum: ["car", "van"],
  },
});

const vehicleModel = mongoose.model("vehicles", vehicleSchema);

export default vehicleModel;
