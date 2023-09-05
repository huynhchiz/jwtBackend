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

const handleCreateNewUser = (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   let username = req.body.username;

   userService.createNewUser(email, password, username);

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
   const userResult = await userService.getUserById(id);

   //vì promiseSQL trả về rows là 1 array nên phải check phần tử trong array
   if (userResult && userResult.length > 0) {
      user = userResult[0];
   } else {
      return user;
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
