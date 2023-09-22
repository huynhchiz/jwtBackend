import jwt from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createJwt = () => {
   let payload = { name: 'Chi', age: '18' };
   let secretkey = JWT_SECRET;
   let token = null;

   try {
      token = jwt.sign(payload, secretkey);
      console.log(token);
   } catch (error) {
      console.log(error);
   }

   return token;
};

const verifyToken = (token) => {
   let secretkey = JWT_SECRET;
   let data = null;

   try {
      let decoded = jwt.verify(token, secretkey);
      data = decoded;
   } catch (error) {
      console.log(error);
   }

   return data;
};

module.exports = {
   createJwt,
   verifyToken,
};
