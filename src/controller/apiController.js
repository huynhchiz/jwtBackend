import loginRegisterService from '../service/loginRegisterService';

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

      // set jwt on cookie
      if (data && data.DT && data.DT.access_token) {
         res.cookie(
            'jwt',
            data.DT.access_token,

            {
               // httpOnly: true => can only 'use' cookie from server side
               httpOnly: true,

               // maxAge: milisecond => time exprires/max-age cookie
               maxAge: 60 * 60 * 1000,
            },
         );
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

module.exports = {
   handleRegister,
   handleLogin,
};
