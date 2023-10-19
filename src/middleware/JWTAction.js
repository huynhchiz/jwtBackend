require('dotenv').config();
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';
const RJWT_SECRET = process.env.RJWT_SECRET;
// const RJWT_EXPIRES_IN = process.env.RJWT_EXPIRES_IN;

const createJwt = (payload) => {
   let token = null;
   let refreshToken = null;

   try {
      token = jwt.sign({ ...payload, ['iat']: Math.floor(Date.now() / 1000) }, JWT_SECRET, {
         expiresIn: JWT_EXPIRES_IN, //set time for Jwt
      });

      refreshToken = jwt.sign(
         { ...payload, ['iat']: Math.floor(Date.now() / 1000) },
         RJWT_SECRET /*{
         expiresIn: RJWT_EXPIRES_IN,
      }*/,
      );
   } catch (error) {
      console.log(error);
   }

   return { token, refreshToken };
};

const refreshToken = (refToken) => {
   // let result = {};
   let newToken = null;
   jwt.verify(refToken, RJWT_SECRET, (err, data) => {
      if (err) {
         console.log('refreshToken err: ', err);
         res.sendStatus(403);
      }
      if (data) {
         console.log('refreshToken data: ', data);
         newToken = jwt.sign({ ...data, ['iat']: Math.floor(Date.now() / 1000) }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN, //set time for Jwt
         });

         console.log({ newToken });

         // result = {
         //    EM: 'refresh token success!',
         //    EC: '0',
         //    DT: {
         //       access_token: newToken,
         //       refresh_token: refToken,
         //       usertypeWithRoles: data.usertypeWithRoles,
         //       email: data.email,
         //       username: data.username,
         //    },
         // };
      }
   });

   return { newToken, refToken };

   // return result;
};

const verifyToken = (token) => {
   let decoded = null;
   let EM = '';

   try {
      decoded = jwt.verify(token, JWT_SECRET);
   } catch (error) {
      console.log('verifyToken error:', error);
      if (error.toString().includes('expired')) {
         console.log('expired token hihi');
         EM = 'expired token';
         return EM;
      }
   }

   return decoded;
};

// get bearer token from header request
const extractToken = (req) => {
   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
   } else {
      return null;
   }
};

// paths that don't need to check jwt to access
const nonSecurePaths = [
   '/',
   '/logout',
   '/login',
   '/register',
   '/usertype/read',
   '/gender/read',
   '/role/read',
   '/refresh-token',
];

const checkUserJwt = (req, res, next) => {
   // paths non secure => next
   if (nonSecurePaths.includes(req.path)) {
      return next();
   }

   // get jwt from cookie
   let cookies = req.cookies;
   // let tokenFromHeader = extractToken(req);

   if (cookies && cookies.jwt /*|| tokenFromHeader*/) {
      // token từ cookies hoặc header
      let token = cookies.jwt; /*? cookies.jwt : tokenFromHeader*/
      console.log({ token });

      // verify token
      let resultVerify = verifyToken(token);
      if (resultVerify && resultVerify !== 'expired token') {
         // req.user | req.token được gán giá trị và các middlewares sau đó đều được sử dụng chung
         req.user = resultVerify;
         req.token = token;

         return next();
      }

      if (resultVerify && resultVerify === 'expired token') {
         req.user = resultVerify;
         return res.status(403).json({
            EC: -3,
            EM: 'expired token',
            DT: '',
         });
      }
      return res.status(401).json({
         EC: -1,
         EM: 'Not authenticated user',
         DT: '',
      });
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

   if (req.user && req.user === 'expired token') {
      return res.status(403).json({
         EC: -3,
         EM: 'expired token',
         DT: '',
      });
   }

   // lấy req.user từ middleware 'checkUserJwt'
   if (req.user && req.user !== 'expired token') {
      let email = req.user.email;
      let roles = req.user.usertypeWithRoles.roles;
      let currentUrl = req.path;

      if (!roles || roles.length === 0) {
         return res.status(403).json({
            EC: -1,
            EM: `Your don't have permission to access`,
            DT: '',
         });
      }

      // check url co params dong
      let canAccess = roles.some((item) => item.url === currentUrl || currentUrl.includes(item.url));
      if (canAccess) {
         next();
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
   refreshToken,
};
