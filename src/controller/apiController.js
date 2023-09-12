import loginRegisterService from '../service/loginRegisterService';

// hàm tạo api để test get
const testApi = (req, res) => {
   return res.status(200).json({
      message: 'ok',
      data: 'hello world',
   });
};

const handleRegister = async (req, res) => {
   try {
      // req.body: email, phone, user, password
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
            EM: data.EM,
            EC: data.EC,
            DT: '',
         });
      }
   } catch (e) {
      console.log('error');
      return res.status(500).json({
         EM: 'error from server',
         EX: '-1',
         DT: '',
      });
   }
};

module.exports = {
   testApi,
   handleRegister,
};
