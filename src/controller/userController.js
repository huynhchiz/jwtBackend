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

const createUser = async (req, res) => {
   try {
      if (!req.body.email || !req.body.phone || !req.body.password) {
         return res.status(200).json({
            EM: 'Missing required parameters!',
            EC: '1',
            DT: '',
         });
      } else {
         // service: create user
         let data = await userApiService.createNewUser(req.body);

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

const updateUser = async (req, res) => {
   try {
      if (!req.body.newEmail || !req.body.newPhone) {
         console.log(req.body);
         return res.status(200).json({
            EM: 'Missing required parameters!',
            EC: '1',
            DT: '',
         });
      } else {
         // service: update user
         let data = await userApiService.updateUser(req.body);

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

const deleteUser = async (req, res) => {
   try {
      console.log(req.body.id);
      let data = await userApiService.deleteUser(req.body.id);
      if (data) {
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
   readUser,
   createUser,
   updateUser,
   deleteUser,
};
