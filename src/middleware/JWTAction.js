import jwt from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createJwt = (payload) => {
   let secretkey = JWT_SECRET;
   let token = null;

   try {
      token = jwt.sign(payload, secretkey);
   } catch (error) {
      console.log(error);
   }

   return token;
};

const verifyToken = (token) => {
   let secretkey = JWT_SECRET;
   let decoded = null;

   try {
      decoded = jwt.verify(token, secretkey);
   } catch (error) {
      console.log(error);
   }

   return decoded;
};

const checkUserJwt = (req, res, next) => {
   // get jwt from cookie
   let cookies = req.cookies;

   if (cookies && cookies.jwt) {
      let token = cookies.jwt;

      // verify token
      let decoded = verifyToken(token);
      if (decoded) {
         // req.user được gán giá trị và các middlewares sau đó đều được sử dụng chung
         req.user = decoded;

         next();
      } else {
         return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated user',
            DT: '',
         });
      }
   } else {
      return res.status(401).json({
         EC: -1,
         EM: 'No jwt found',
         DT: '',
      });
   }
};

const checkUserPremission = (req, res, next) => {
   // lấy req.user từ middleware 'checkUserJwt'
   if (req.user) {
      let email = req.user.email;
      let roles = req.user.usertypeWithRoles.roles;
      let currentUrl = req.path;

      if (!roles || roles.length === 0) {
         return res.status(403).json({
            EC: -1,
            EM: `Your don't have permission to access`,
            DT: '',
         });
      } else {
         let isAllowAccess = roles.some((item) => item.url === currentUrl);

         if (isAllowAccess) {
            next();
         } else {
         }
      }
   } else {
      return res.status(401).json({
         EC: -1,
         EM: 'Not authenticated user',
         DT: '',
      });
   }
};

module.exports = {
   createJwt,
   verifyToken,
   checkUserJwt,
   checkUserPremission,
};
