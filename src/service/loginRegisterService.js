import db from '../models/index';
import bcrypt from 'bcryptjs';

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

const registerUser = async (rawUserData) => {
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
   } catch (e) {
      console.log(e);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
      };
   }
};

module.exports = {
   registerUser,
};
