import db from '../models/index';

const getAllGender = async () => {
   try {
      let genders = await db.Gender.findAll({
         attributes: ['id', 'name'],
      });
      if (genders) {
         return {
            EM: 'Get data success!',
            EC: 0,
            DT: genders,
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

module.exports = {
   getAllGender,
};
