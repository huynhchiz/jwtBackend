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

   // dấu :id là cách truyền tham số động 'id' của express (giống nội suy)
   // truyền id để bên controller nhận được
   router.post('/users/delete-user/:id', homeController.handleDeleteUser);

   router.get('/users/update-user/:id', homeController.getUpdateUserPage);

   router.post('/users/update-user', homeController.handleUpdateUser);

   return app.use('/', router); // website sẽ bắt đầu bằng localhost:1997/
};

export default initWebRoutes;
