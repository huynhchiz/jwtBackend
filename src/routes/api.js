import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import usertypeController from '../controller/usertypeController';

const router = express.Router();

const initApiRoutes = (app) => {
   // rest api
   router.get('/test-api', apiController.testApi);
   router.post('/register', apiController.handleRegister);
   router.post('/login', apiController.handleLogin);

   // CRUD api
   router.get('/user/read', userController.readUser);
   router.post('/user/create', userController.createUser);
   router.put('/user/update', userController.updateUser);
   router.delete('/user/delete', userController.deleteUser);

   router.get('/usertype/read', usertypeController.readUsertype);

   return app.use('/api/ver1', router); // website sẽ bắt đầu bằng
};

export default initApiRoutes;
