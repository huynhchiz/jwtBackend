import express from 'express';

import apiController from '../controller/apiController';
import userController from '../controller/userController';
import usertypeController from '../controller/usertypeController';
import genderController from '../controller/genderController';
import roleController from '../controller/roleController';
import { checkUserJwt, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();

const initApiRoutes = (app) => {
   router.all('*', checkUserJwt, checkUserPermission);

   // login logout register
   router.post('/register', apiController.handleRegister);
   router.post('/login', apiController.handleLogin);
   router.post('/logout', apiController.handleLogout);

   // get logging in current account
   router.get('/account', userController.getUserAccount);

   // refresh token
   router.post('/refresh-token', apiController.refreshToken);

   // CRUD users
   router.get('/user/read', userController.readUser);
   router.post('/user/create', userController.createUser);
   router.put('/user/update', userController.updateUser);
   router.delete('/user/delete', userController.deleteUser);

   router.get('/usertype/read', usertypeController.readUsertype);
   router.get('/gender/read', genderController.readGender);

   // roles
   router.get('/role/read', roleController.readRole);
   router.post('/role/create', roleController.createRole);
   router.put('/role/update', roleController.updateRole);
   router.delete('/role/delete', roleController.deleteRole);
   router.get('/role/by-usertype/:usertypeId', roleController.getRolesByUsertype);
   router.post('/role/assign-to-usertype', roleController.assignRolesToUsertype);

   return app.use('/api/ver1', router); // website sẽ bắt đầu bằng
};

export default initApiRoutes;
