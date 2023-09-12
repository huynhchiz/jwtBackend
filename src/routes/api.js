import express from 'express';
import apiController from '../controller/apiController';

const router = express.Router();

const initApiRoutes = (app) => {
   // rest api
   router.get('/test-api', apiController.testApi);
   router.post('/register', apiController.handleRegister);
   router.post('/login', apiController.handleLogin);

   return app.use('/api/ver1', router); // website sẽ bắt đầu bằng
};

export default initApiRoutes;
