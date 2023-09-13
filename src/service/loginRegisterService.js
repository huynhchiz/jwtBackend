import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize'; // dùng thư viện toán tử để or condition

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
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
      };
   }
};

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
      console.log('show user data: ', user.dataValues);

      // neu co user trong db
      if (user) {
         console.log('found user with email/phone: ', rawUserData.loginValue);

         // check password
         let isCorrectPassword = checkPassword(rawUserData.password, user.password);

         // neu password OK
         if (isCorrectPassword) {
            console.log('password is correct!');
            return {
               EM: 'Ok!',
               EC: '0',
               DT: '',
            };

            // neu password SAI
         } else {
            console.log('password is incorrect!');
            return {
               EM: 'password is incorrect!',
               EC: '1',
               DT: '',
            };
         }

         // neu ko co user trong db
      } else {
         return {
            EM: 'Your email / phone number is incorret!',
            EC: '1',
            DT: '',
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
      };
   }
};

module.exports = {
   registerUser,
   handleUserLogin,
};
