import db from '../models/index';

const getAllUser = async () => {
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

const createNewUser = async (data) => {
   try {
      await db.User.create({});
   } catch (error) {
      console.log(error);
   }
};

const updateUser = async (data) => {
   try {
      //   let user = await db.User.findOne({
      //      where: { id: data.id },
      //   });
      if (user) {
         // update user
         // db.User.update(
         //     {
         //        email: data.username,
         //        username: data.username,
         //     },
         //     {
         //        where: {
         //           id: data.id,
         //        },
         //     },
         //  );
      } else {
         // not found user :v
      }
   } catch (error) {
      console.log(error);
   }
};

const deleteUser = async (id) => {
   try {
      await db.User.delete({
         where: { id: id },
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getAllUser,
   createNewUser,
   updateUser,
   deleteUser,
};
