import db from '../models/index';

const getAllUser = async () => {
   // get all users (no condition)
   try {
      let users = await db.User.findAll({
         attributes: ['id', 'email', 'username', 'phone'],
         include: { model: db.Usertype, attributes: ['name', 'description'] },
      });
      if (users) {
         return {
            EM: 'Get data success!',
            EC: 0,
            DT: users,
         };
      } else {
         return {
            EM: 'Get no data!',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

const getUsersWithPagination = async (page, limit) => {
   try {
      let users = await db.User.findAll();
      let totalUser = users.length;

      // offset là số count users 'ko được hiển thị' nằm trước usersInOnePage trong users
      // nó là thuộc tính cần để query SQL
      let offset = (page - 1) * limit;

      // users hiển thị trong current page (type: array)
      let usersInOnePage = await db.User.findAll({
         offset: offset,
         limit: limit,
         attributes: ['id', 'email', 'username', 'phone'],
         include: { model: db.Usertype, attributes: ['name', 'description'] },
      });

      // tổng số page để phân trang
      let totalPage = Math.ceil(totalUser / limit);

      let data = {
         // cần trả về cục data này để phân trang
         usersInOnePage,
         offset,
         totalPage,
      };

      if (data) {
         return {
            EM: 'Get data success!',
            EC: 0,
            DT: data,
         };
      } else {
         return {
            EM: 'Get no data!',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

const createNewUser = async (data) => {
   try {
   } catch (error) {
      console.log(error);
   }
};

const updateUser = async (data) => {
   try {
      if (user) {
         // update user
      } else {
         // not found user :v
      }
   } catch (error) {
      console.log(error);
   }
};

const deleteUser = async (id) => {
   try {
      if (id) {
         await db.User.destroy({
            where: { id: id },
         });
         return {
            EM: 'Delete user with id = ' + id,
            EC: 0,
            DT: '',
         };
      } else {
         return {
            EM: 'No user found',
            EC: 0,
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong with service',
         EC: -1,
         DT: [],
      };
   }
};

module.exports = {
   getAllUser,
   createNewUser,
   updateUser,
   deleteUser,
   getUsersWithPagination,
};
