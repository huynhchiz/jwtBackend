import userApiService from '../service/userApiService';

const readUser = async (req, res) => {
   //
   try {
      // nếu có phân trang với query page và limit => get users with pagination
      if (req.query.page && req.query.limit) {
         let page = req.query.page;
         let limit = req.query.limit;

         // phải truyền vào KDL 'number' (+page, +limit) thì sql nó mới hiểu
         let data = await userApiService.getUsersWithPagination(+page, +limit);
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });

         // nếu ko có phân trang => get all user
      } else {
         let data = await userApiService.getAllUser();
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      }
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
