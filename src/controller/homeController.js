// homeController.js
// xử lý các bước trước khi render page

import userService from '../service/userService';

const handleHomePage = (req, res) => {
   // thực hiện model ở đây : get data from database
   return res.render('home.ejs');
};

const handleUserPage = async (req, res) => {
   // thực hiện model ở đây : get data from database
   let userList = await userService.getUserList();
   return res.render('user.ejs', { userList });
};

const handleCreateNewUser = async (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   let username = req.body.username;

   await userService.createNewUser(email, password, username);

   return res.redirect('/user');
};

const handleDeleteUser = async (req, res) => {
   // lấy id động từ req.post ---- get params expressjs
   let id = req.params.id;

   await userService.deleteUser(id);

   return res.redirect('/user');
};

const getUpdateUserPage = async (req, res) => {
   let user = {};
   let id = req.params.id;
   try {
      user = await userService.getUserById(id);
   } catch (err) {
      console.log(err);
   }

   return res.render('user-update.ejs', { user });
};

const handleUpdateUser = async (req, res) => {
   let id = req.body.id;
   let email = req.body.email;
   let username = req.body.username;

   await userService.updateUser(id, email, username);

   return res.redirect('/user');
};

// cú pháp export được nodeJs hỗ trợ module.exports
module.exports = {
   handleHomePage,
   handleUserPage,
   handleCreateNewUser,
   handleDeleteUser,
   getUpdateUserPage,
   handleUpdateUser,
};
