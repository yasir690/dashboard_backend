import { Router } from "express"; 


import * as DashboardControllers from "../Controller/Dasboard.js";
import auth from './Middleware/Auth.js'

export const DashboardRouter=Router();

DashboardRouter.get('/countUser',auth,DashboardControllers.countUser);

DashboardRouter.get('/androiduser',auth,DashboardControllers.getAndroidUsers);

DashboardRouter.get('/iosuser',auth,DashboardControllers.getIosUsers);

DashboardRouter.get('/webuser',auth,DashboardControllers.getWebUsers);