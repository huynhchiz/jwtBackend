require('dotenv').config();
import jwt from 'jsonwebtoken';

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

// paths that don't need to check jwt to access
const nonSecurePaths = ['/', '/login', '/register', '/usertype/read', '/gender/read'];

const checkUserJwt = (req, res, next) => {
   // paths non secure => next
   if (nonSecurePaths.includes(req.path)) {
      return next();
   }

   // get jwt from cookie
   let cookies = req.cookies;

   if (cookies && cookies.jwt) {
      let token = cookies.jwt;

      // verify token
      let decoded = verifyToken(token);
      if (decoded) {
         // req.user | req.token được gán giá trị và các middlewares sau đó đều được sử dụng chung
         req.user = decoded;
         req.token = token;

         return next();
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

const checkUserPermission = (req, res, next) => {
   // paths non secure => next
   if (nonSecurePaths.includes(req.path) || req.path === '/account') {
      return next();
   }

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
         // check if current url (current permission) match with 1 of user roles
         let isAllowAccess = roles.some((role) => role.url === currentUrl);
         if (isAllowAccess) {
            return next();

            // if doesn't match any of roles
         } else {
            return res.status(403).json({
               EC: -1,
               EM: `Your don't have permission to access`,
               DT: '',
            });
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
   checkUserPermission,
};
