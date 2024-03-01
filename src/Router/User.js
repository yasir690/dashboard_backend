import { Router } from "express"; 


import * as UserControllers from "../Controller/Users.js";

export const UserRouters = Router();
import auth from './Middleware/Auth.js'
UserRouters.post('/userRegister',UserControllers.userRegister);

UserRouters.post('/userLogin',UserControllers.userLogin);

UserRouters.post('/addUser',auth,UserControllers.addUser);

UserRouters.get('/getUser',auth,UserControllers.getUser);

UserRouters.put('/updateUser/:id',auth,UserControllers.updateUser);

UserRouters.delete('/deleteUser/:id',auth,UserControllers.deleteUser);











