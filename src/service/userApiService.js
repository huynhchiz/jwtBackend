import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

// READ
const getAllUser = async () => {
   // get all users (no condition)
   try {
      let users = await db.User.findAll({
         attributes: ['id', 'email', 'username', 'phone', 'address'],
         include: { model: db.Usertype, attributes: ['name', 'description'] },
      });
      if (users) {
         return {
            EM: 'Get data success!',
            EC: 0,
            DT: users,
         };
      } else {
         return {
            EM: 'Get no data!',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

const getUsersWithPagination = async (page, limit) => {
   try {
      let users = await db.User.findAll();
      let totalUser = users.length;

      // offset là số count users 'ko được hiển thị' nằm trước usersInOnePage trong users
      // nó là thuộc tính cần để query SQL
      let offset = (page - 1) * limit;

      // users hiển thị trong current page (type: array)
      let usersInOnePage = await db.User.findAll({
         offset: offset,
         limit: limit,
         attributes: ['id', 'email', 'username', 'phone', 'address'],
         include: { model: db.Usertype, attributes: ['name', 'description'] },
      });

      // tổng số page để phân trang
      let totalPage = Math.ceil(totalUser / limit);

      let data = {
         // cần trả về cục data này để phân trang
         usersInOnePage,
         offset,
         totalPage,
      };

      if (data) {
         return {
            EM: 'Get data success!',
            EC: 0,
            DT: data,
         };
      } else {
         return {
            EM: 'Get no data!',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

// CREATE
const salt = bcrypt.genSaltSync(10); // bcryptjs hass sync
const hashUserPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

const checkEmailExisted = async (userEmail) => {
   let user = await db.User.findOne({
      where: { email: userEmail },
   });

   if (user) {
      return true;
   } else {
      return false;
   }
};

const checkPhoneExisted = async (userPhone) => {
   let user = await db.User.findOne({
      where: { phone: userPhone },
   });

   console.log(user);
   if (user) {
      return true;
   } else {
      return false;
   }
};

const createNewUser = async (rawUserData) => {
   try {
      // check email if it's existed
      let isEmailExisted = await checkEmailExisted(rawUserData.email);
      if (isEmailExisted) {
         return {
            TYPE: 'email',
            EM: 'Email is already exist',
            EC: '1',
         };
      }

      // check phone if it's existed
      let isPhoneExisted = await checkPhoneExisted(rawUserData.phone);
      if (isPhoneExisted) {
         return {
            TYPE: 'phone',
            EM: 'Phone number is already exist',
            EC: '1',
         };
      }

      let hassPass = hashUserPassword(rawUserData.password);

      // create new user
      await db.User.create({
         email: rawUserData.email,
         phone: rawUserData.phone,
         username: rawUserData.username,
         password: hassPass,
      });

      return {
         EM: 'User is created successfully',
         EC: '0',
      };
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
      };
   }
};

// UPDATE
const checkEmailExistNotCurrent = async (newEmail, currentId) => {
   let usersNotCurrent = await db.User.findAll({
      where: { id: { [Op.not]: currentId } },
      raw: true,
   });

   let isExist = usersNotCurrent.some((user) => {
      return user.email === newEmail;
   });

   if (isExist) {
      return true;
   } else {
      return false;
   }
};

const checkPhoneExistNotCurrent = async (userPhone, currentId) => {
   let usersNotCurrent = await db.User.findAll({
      where: { id: { [Op.not]: currentId } },
      raw: true,
   });

   let isExist = usersNotCurrent.some((user) => {
      return user.phone === userPhone;
   });

   if (isExist) {
      return true;
   } else {
      return false;
   }
};

const updateUser = async (rawUserData) => {
   try {
      // check email if it's existed
      let isEmailExisted = await checkEmailExistNotCurrent(rawUserData.newEmail, rawUserData.currentId);
      if (isEmailExisted) {
         return {
            TYPE: 'email',
            EM: 'Email is already used by another user',
            EC: '1',
         };
      }

      // check phone if it's existed
      let isPhoneExisted = await checkPhoneExistNotCurrent(rawUserData.newPhone, rawUserData.currentId);
      if (isPhoneExisted) {
         return {
            TYPE: 'phone',
            EM: 'Phone number is already used by onther user',
            EC: '1',
         };
      }

      await db.User.update(
         {
            email: rawUserData.newEmail,
            phone: rawUserData.newPhone,
            username: rawUserData.newUsername,
            address: rawUserData.newAddress,
         },
         {
            where: {
               id: rawUserData.currentId,
            },
         },
      );

      return {
         EM: 'User is updated successfully',
         EC: '0',
      };
   } catch (err) {
      console.log(err);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
      };
   }
};

// DELETE
const deleteUser = async (id) => {
   try {
      if (id) {
         await db.User.destroy({
            where: { id: id },
         });
         return {
            EM: 'Delete user with id = ' + id,
            EC: 0,
            DT: '',
         };
      } else {
         return {
            EM: 'No user found',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

module.exports = {
   getAllUser,
   createNewUser,
   updateUser,
   deleteUser,
   getUsersWithPagination,
};
