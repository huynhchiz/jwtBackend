// userService.js
// xử lý những thứ liên quan đến database

import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10); // bcryptjs hass sync

const hashUserPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

const createNewUser = (email, password, username) => {
   let hashPass = hashUserPassword(password);

   connection.query(
      // câu lệnh insert vào table user trong jwt database
      'INSERT INTO users(email, password, username) VALUES (?, ?, ?)',
      [email, hashPass, username],
      function (err, results, fields) {
         if (err) {
            console.log(err);
         }
      },
   );
};

const getUserList = async () => {
   // create the connection to database
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt', //database jwt trong phpMyadmin
      Promise: bluebird,
   });

   try {
      const [rows, fields] = await connection.execute('SELECT * FROM users');
      return rows;
   } catch (err) {
      console.log('show err:', err);
      return [];
   }
};

module.exports = {
   createNewUser,
   getUserList,
};
