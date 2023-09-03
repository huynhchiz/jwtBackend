// homeController.js
// xử lý các bước trước khi render page

import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'jwt', //database trong phpMyadmin
});

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

   connection.query(
      'INSERT INTO users(email, password, username) VALUES (?, ?, ?)',
      [email, password, username],
      function (err, results, fields) {
         if (err) {
            console.log(err);
         }
         console.log(results); // results contains rows returned by server
      },
   );

   res.send('handle create new user');
};

// cú pháp export được nodeJs hỗ trợ module.exports
module.exports = {
   handleHomePage,
   handleUserPage,
   handleCreateNewUser,
};
