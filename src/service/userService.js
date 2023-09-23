// userService.js
// xử lý những thứ liên quan đến database

// import mysql from 'mysql2/promise';
// import bluebird from 'bluebird';
import db from '../models/index';
import bcrypt from 'bcryptjs';

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
   // chọn ra User (id, email, name) có id = 1, bao gồm cả cái Usertype (name, des) của User đó
   // let newUser = await db.User.findOne({
   //    where: { id: 1 }, //điều kiện
   //    attributes: ['id', 'email', 'username'], //chỉ lấy ra những columns (attributes) được chọn
   //    include: { model: db.Usertype, attributes: ['name', 'description'] }, //để lấy ra data trong table mà User nó belongTo (là Usertype)
   //    raw: true, // thuộc tính giúp expressjs trả về data là đúng 1 obj cần lấy
   //    nest: true, //gộp những ptu giống nhau về 1 obj
   // });

   // chọn ra tất cả Role (url, des) của cái Usertype (name) có id = 1
   // let newRole = await db.Role.findAll({
   //    include: { model: db.Usertype, where: { id: 1 }, attributes: ['name'] },
   //    attributes: ['url', 'description'],
   //    raw: true,
   //    nest: true,
   // });

   // console.log('show newUser: ', newUser);
   // console.log('show newRole: ', newRole);
   ///////

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
