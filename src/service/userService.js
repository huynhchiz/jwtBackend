// userService.js
// xử lý những thứ liên quan đến database

import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

import bcrypt from 'bcryptjs';

import db from '../models/index';

const salt = bcrypt.genSaltSync(10); // bcryptjs hass sync

const hashUserPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

const createNewUser = async (email, password, username) => {
   let hashPass = hashUserPassword(password);

   try {
      await db.User.create({
         username: username,
         email: email,
         password: hashPass,
      });
   } catch (err) {
      console.log('show err:', err);
   }
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
      const [rows, fields] = await connection.execute('SELECT * FROM user');
      return rows;
   } catch (err) {
      console.log('show err:', err);
      return [];
   }
};

const deleteUser = async (id) => {
   // create the connection to database
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt', //database jwt trong phpMyadmin
      Promise: bluebird,
   });

   try {
      const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
      return rows;
   } catch (err) {
      console.log('show err:', err);
      return [];
   }
};

const getUserById = async (id) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: bluebird,
   });

   try {
      const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
      return rows;
   } catch (err) {
      console.log('show err:', err);
      return [];
   }
};

const updateUser = async (id, email, username) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: bluebird,
   });

   try {
      const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [
         email,
         username,
         id,
      ]);
      return rows;
   } catch (err) {
      console.log('show err:', err);
      return [];
   }
};

module.exports = {
   createNewUser,
   getUserList,
   deleteUser,
   getUserById,
   updateUser,
};
