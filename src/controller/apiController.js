// hàm tạo api để test
const testApi = (req, res) => {
   return res.status(200).json({
      message: 'ok',
      data: 'hello world',
   });
};

const handleRegister = (req, res) => {
   console.log('register', req.body);
};

module.exports = {
   testApi,
   handleRegister,
};
