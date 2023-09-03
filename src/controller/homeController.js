// homeController.js
// xử lý các bước trước khi render page

import userService from '../service/userService';

const handleHomePage = (req, res) =>
   // thực hiện model ở đây : get data from database
   res.render('home.ejs');

const handleUserPage = (req, res) =>
   // thực hiện model ở đây : get data from database
   res.render('user.ejs');

const handleCreateNewUser = (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   let username = req.body.username;

   userService.createNewUser(email, password, username);

   res.send('handle create new user');
};

// cú pháp export được nodeJs hỗ trợ module.exports
module.exports = {
   handleHomePage,
   handleUserPage,
   handleCreateNewUser,
};
