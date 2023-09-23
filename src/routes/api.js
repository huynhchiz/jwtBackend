import express from 'express';

import apiController from '../controller/apiController';
import userController from '../controller/userController';
import usertypeController from '../controller/usertypeController';
import genderController from '../controller/genderController';
import { checkUserJwt, checkUserPremission } from '../middleware/JWTAction';

const router = express.Router();

const initApiRoutes = (app) => {
   // rest api
   router.post('/register', apiController.handleRegister);
   router.post('/login', apiController.handleLogin);

   // CRUD api
   router.get('/user/read', checkUserJwt, checkUserPremission, userController.readUser);
   router.post('/user/create', userController.createUser);
   router.put('/user/update', userController.updateUser);
   router.delete('/user/delete', userController.deleteUser);

   router.get('/usertype/read', usertypeController.readUsertype);

   router.get('/gender/read', genderController.readGender);

   return app.use('/api/ver1', router); // website sẽ bắt đầu bằng
};

export default initApiRoutes;
