import loginRegisterService from '../service/loginRegisterService';
import JWTAction from '../middleware/JWTAction';

// register
const handleRegister = async (req, res) => {
   try {
      if (!req.body.email || !req.body.phone || !req.body.password) {
         return res.status(200).json({
            EM: 'Missing required parameters!',
            EC: '1',
            DT: '',
         });
      } else {
         // service: create user
         let data = await loginRegisterService.registerUser(req.body);

         return res.status(200).json({
            TYPE: data.TYPE,
            EM: data.EM,
            EC: data.EC,
            DT: '',
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EX: '-1',
         DT: '',
      });
   }
};

// login
const handleLogin = async (req, res) => {
   try {
      let data = await loginRegisterService.handleUserLogin(req.body);
      if (data && data.DT && data.DT.access_token && data.DT.refresh_token) {
         // set token
         res.cookie('jwt', data.DT.access_token, {
            httpOnly: true, // can only 'use' cookie from server side
            maxAge: 60000 * 1000, // time exprires/max-age cookie (ms)
         });
         // set refreshToken
         res.cookie('refreshToken', data.DT.refresh_token, {
            httpOnly: true,
            maxAge: 60000 * 1000,
         });

         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      } else {
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EX: '-1',
         DT: '',
      });
   }
};

const refreshToken = async (req, res) => {
   // get refreshToken from cookie
   let email = req.email;
   let phone = req.phone;
   let cookies = req.cookies;
   let refreshTokenFromCookie = cookies.refreshToken;

   if (!refreshTokenFromCookie) {
      return res.status(403).json({
         EM: 'No refresh token available',
         EC: '-1',
         DT: '',
      });
   }

   try {
      let newdata = await loginRegisterService.refreshUserToken(email, phone, refreshTokenFromCookie);
      if (newdata && +newdata.EC === 0) {
         res.clearCookie('jwt');
         // set token
         res.cookie('jwt', newdata.DT.access_token, {
            httpOnly: true,
            maxAge: 60000 * 1000,
         });

         return res.status(200).json({
            EM: newdata.EM,
            EC: newdata.EC,
            DT: newdata.DT,
         });
      } else {
         return res.status(403).json({
            EM: 'refreshToken expired!',
            EC: newdata.EC,
            DT: newdata.DT,
         });
      }
   } catch (error) {
      console.log({ error });
      return res.status(500).json({
         EM: 'error from server',
         EC: '-1',
         DT: '',
      });
   }
};

const handleLogout = async (req, res) => {
   try {
      res.clearCookie('jwt');
      res.clearCookie('refreshToken');
      return res.status(200).json({
         EM: 'clear coookie jwt success',
         EC: 0,
         DT: '',
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EX: '-1',
         DT: '',
      });
   }
};

module.exports = {
   handleRegister,
   handleLogin,
   handleLogout,
   refreshToken,
};
