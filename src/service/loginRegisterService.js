require('dotenv').config();
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize'; // dùng thư viện toán tử để or condition

import db from '../models/index';
import JWTService from './JWTService';
import JWTAction from '../middleware/JWTAction';

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
         usertypeId: 4, //mac dinh la guess neu register
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

//login
const checkPassword = (inputPassword, hashPassword) => {
   return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleUserLogin = async (rawUserData) => {
   try {
      // find user trong db voi dieu kien == email or phone input
      let user = await db.User.findOne({
         where: {
            [Op.or]: [{ email: rawUserData.loginValue }, { phone: rawUserData.loginValue }],
         },
      });

      // neu co user trong db
      if (user) {
         // console.log('found user with email/phone: ', rawUserData.loginValue);

         // check password
         let isCorrectPassword = checkPassword(rawUserData.password, user.password);

         // neu password OK
         if (isCorrectPassword) {
            // test role:
            let usertypeWithRoles = await JWTService.getUsertypeWithRoles(user);

            let payload = {
               email: user.email,
               username: user.username,
               usertypeWithRoles,
            };

            let token = JWTAction.createJwt(payload);

            console.log('password is correct!');
            return {
               EM: 'Ok!',
               EC: '0',
               DT: {
                  access_token: token,
                  usertypeWithRoles,
                  email: user.email,
                  username: user.username,
               },
            };
         } else {
            console.log('password is incorrect!');
         }
      }

      // neu ko co user || sai password
      console.log('Email / phone or password is incorrect!');
      return {
         EM: 'Your email / phone number or password is incorrect!',
         EC: '1',
         DT: '',
      };
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
         DT: '',
      };
   }
};

module.exports = {
   registerUser,
   handleUserLogin,
};
