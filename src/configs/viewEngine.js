// định nghĩa (cấu hình) engine để render giao diện JS cho nodeJS
import express from 'express';

/**
 *
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
   app.use(express.static('./src/public')); //express static files
   app.set('view engine', 'ejs'); // định nghĩa ta dùng html thông qua cái view engine là thư viện ejs
   app.set('views', './src/views'); // định nghĩa những file view (engine) sẽ lưu bên trong src/views
};

export default configViewEngine;
