import db from '../models/index';

// khi login xong => truyền vào user
const getUsertypeWithRoles = async (user) => {
   // lấy ra user type và các roles của usertype đó
   let usertype = await db.Usertype.findOne({
      where: { id: user.usertypeId },
      attributes: ['id', 'name', 'description'],
      raw: true,
   });

   let roles = await db.Role.findAll({
      attributes: ['id', 'url', 'description'],
      include: { model: db.Usertype, where: { id: user.usertypeId }, attributes: [], through: { attributes: [] } },
      throught: { attributes: [] },
      raw: true,
      nest: true,
   });

   console.log('roles: ', { ...usertype, roles });

   // gộp lại thành 1 object
   return usertype && roles ? { ...usertype, roles } : {};
};

module.exports = {
   getUsertypeWithRoles,
};
