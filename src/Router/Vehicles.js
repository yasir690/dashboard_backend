import { Router } from "express"; 


import * as VehicleControllers from "../Controller/Vehicles.js";
import auth from './Middleware/Auth.js'

export const VehicleRouters = Router();


// application.prefix = Router.prefix = function (path, middleware, configure) {
//   configure(VehicleRouters);
//   this.use(path, middleware, VehicleRouters);
//   return VehicleRouters;
// };


//create vehicle Router


VehicleRouters.post("/createVehicle",auth, VehicleControllers.createVehicle );
// VehicleRouters.route( "/vehicle/import" ).post( VehicleControllers.createVehiclebyimport );

//get vehicle Router

VehicleRouters.get( "/getVehicle",auth,VehicleControllers.getVehicle );

//update vehicle Router

VehicleRouters.put( "/updateVehicle/:id",auth,VehicleControllers.updateVehicle );

//delete vehicle Router

VehicleRouters.delete( "/deleteVehicle/:id",auth,VehicleControllers.deleteVehicle );

