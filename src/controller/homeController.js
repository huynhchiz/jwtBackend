// homeController.js
// xử lý các bước trước khi render page

const handleHomePage = (req, res) =>
   // thực hiện model ở đây : get data from database
   res.render('home.ejs');

const handleUserPage = (req, res) =>
   // thực hiện model ở đây : get data from database
   res.render('user.ejs');

// cú pháp export được nodeJs hỗ trợ module.exports
module.exports = {
   handleHomePage,
   handleUserPage,
};
