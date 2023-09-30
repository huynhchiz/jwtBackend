import db from '../models';

const createNewRoles = async (newRoles) => {
   try {
      // all existed roles in data
      let allRolesInData = await db.Role.findAll({
         attributes: ['url', 'description'],
         raw: true,
      });

      // roles that can be create / different with existed roles in data
      // hàm này check những roles trong input nếu chưa có trong data thì lấy role đó
      let noneExistRoles = newRoles.filter((item1) => {
         return !allRolesInData.some((item2) => item1.url === item2.url);
      });

      let rolesForCreate = noneExistRoles;
      if (rolesForCreate.length === 0) {
         return {
            EM: 'All the roles are existed',
            EC: 0,
            DT: [],
         };
      } else {
         // create multiple row in sql sequelize
         await db.Role.bulkCreate(rolesForCreate);
         return {
            EM: `Create ${rolesForCreate.length} role${rolesForCreate.length > 1 ? 's' : ''} success`,
            EC: 0,
            DT: rolesForCreate,
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'something wrong with the service',
         EC: 1,
         DT: [],
      };
   }
};

module.exports = {
   createNewRoles,
};
