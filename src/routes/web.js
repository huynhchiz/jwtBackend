// web.js
// khai báo các router đường dẫn đến các page

import express from 'express';

import homeController from '../controller/homeController';

const router = express.Router();

/**
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
   router.get('/', homeController.handleHomePage);

   router.get('/user', homeController.handleUserPage);

   router.post('/users/create-user', homeController.handleCreateNewUser);

   return app.use('/', router); // website sẽ bắt đầu bằng localhost:1997/
};

export default initWebRoutes;
