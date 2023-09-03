// userService.js
// xử lý những cái liên quan đến database

import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10); // bcryptjs hass sync

// create the connection to database
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'jwt', //database trong phpMyadmin
});

const hashUserPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

const createNewUser = (email, password, username) => {
   let hashPass = hashUserPassword(password);

   connection.query(
      'INSERT INTO users(email, password, username) VALUES (?, ?, ?)',
      [email, hashPass, username],
      function (err, results, fields) {
         if (err) {
            console.log(err);
         }
      },
   );
};

const getUserList = () => {
   connection.query('SELECT * from users', function (err, results, fields) {
      if (err) {
         console.log(err);
      }
      console.log('show results: ', results);
   });
};

module.exports = {
   createNewUser,
   getUserList,
};
