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
   let users = [];

   try {
      users = await db.User.findAll();
   } catch (err) {
      console.log(err);
   }
   return users;
};

const deleteUser = async (id) => {
   try {
      await db.User.destroy({
         where: {
            id: id,
         },
      });
   } catch (err) {
      console.log(err);
   }
};

const getUserById = async (id) => {
   let user = {};
   try {
      user = await db.User.findOne({
         where: {
            id: id,
         },
      });
   } catch (err) {
      console.log(err);
   }
   return user;
};

const updateUser = async (id, email, username) => {
   try {
      await db.User.update(
         {
            email: email,
            username: username,
         },
         {
            where: {
               id: id,
            },
         },
      );
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   createNewUser,
   getUserList,
   deleteUser,
   getUserById,
   updateUser,
};
