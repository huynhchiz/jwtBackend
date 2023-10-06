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

const getRoles = async (page, limit) => {
   try {
      let allRoles = await db.Role.findAll();
      let totalRole = allRoles.length;
      let totalPage = Math.ceil(totalRole / limit);
      let offset = page > 1 ? (page - 1) * limit : 0;
      let rolesInOnePage = await db.Role.findAll({
         offset: +offset,
         limit: limit,
         attributes: ['id', 'url', 'description'],
      });

      let data = {
         allRoles,
         totalPage,
         rolesInOnePage,
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

const deleteRole = async (roleId) => {
   try {
      if (roleId) {
         await db.Role.destroy({
            where: { id: roleId },
         });
         return {
            EM: 'Delete role with id = ' + roleId,
            EC: 0,
            DT: '',
         };
      } else {
         return {
            EM: 'No role found',
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

const updateRole = async (inputData) => {
   try {
      await db.Role.update(
         {
            description: inputData.description,
         },
         {
            where: {
               id: inputData.currentId,
            },
         },
      );

      return {
         EM: 'Role is updated successfully',
         EC: '0',
         DT: '',
      };
   } catch (err) {
      console.log(err);
      return {
         EM: 'Something wrong in service',
         EC: '-2',
         DT: '',
      };
   }
};

const getRolesByUsertype = async (id) => {
   try {
      if (id) {
         let data = {};
         let usertype = await db.Usertype.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            raw: true,
         });

         let rolesByUserType = await db.Role.findAll({
            attributes: ['id', 'url', 'description'],
            include: {
               model: db.Usertype,
               where: { id: id },
               attributes: [],
               through: { attributes: [] },
            },
            throught: { attributes: [] },
            raw: true,
            nest: true,
         });

         // gộp lại thành 1 object 'usertypeWithRoles'
         data = usertype && rolesByUserType ? { ...usertype, rolesByUserType } : {};
         if (data && Object.keys(data).length !== 0) {
            return {
               EM: 'Get roles by usertype success!',
               EC: 0,
               DT: data,
            };
         } else {
            return {
               EM: 'No role found / or usertype id is incorrect',
               EC: -1,
               DT: '',
            };
         }
      } else {
         return {
            EM: 'No id params',
            EC: -1,
            DT: '',
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

const assignRolesToUsertype = async (data) => {
   try {
      await db.Role_Usertype.destroy({
         where: { usertypeId: +data.usertypeId },
      });

      await db.Role_Usertype.bulkCreate(data.rolesUsertype);

      return {
         EM: `Assign roles for usertype id: ${data.usertypeId} success!`,
         EC: 0,
         DT: [],
      };
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
   createNewRoles,
   getRoles,
   deleteRole,
   updateRole,
   getRolesByUsertype,
   assignRolesToUsertype,
};
