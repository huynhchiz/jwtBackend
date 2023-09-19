import db from '../models/index';

const getAllUsertype = async () => {
   try {
      let usertypes = await db.Usertype.findAll({
         attributes: ['id', 'name', 'description'],
         raw: true,
      });

      if (usertypes) {
         console.log(usertypes);
         return {
            EM: 'Get usertypes success',
            EC: 0,
            DT: usertypes,
         };
      } else {
         return {
            EM: 'No usertype found!',
            EC: '1',
            DT: [],
         };
      }
   } catch (error) {
      console.log(error);
      return {
         EM: 'Something wrong in service',
         EC: -2,
         DT: [],
      };
   }
};

module.exports = {
   getAllUsertype,
};
