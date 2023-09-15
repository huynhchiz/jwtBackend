import userApiService from '../service/userApiService';

const readUser = async (req, res) => {
   //
   try {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
         TYPE: data.TYPE,
         EM: data.EM,
         EC: data.EC,
         DT: data.DT,
      });
      //
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EX: '-1',
         DT: '',
      });
   }
};
const createUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
   readUser,
   createUser,
   updateUser,
   deleteUser,
};
