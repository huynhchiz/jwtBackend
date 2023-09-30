import roleApiService from '../service/roleApiService';

const readRole = () => {};

const createRole = async (req, res) => {
   try {
      let data = await roleApiService.createNewRoles(req.body);

      if (data) {
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         EM: 'Something wrong in server',
         EC: '-1',
         DT: [],
      });
   }
};

const deleteRole = () => {};

const updateRole = () => {};

module.exports = {
   readRole,
   createRole,
   deleteRole,
   updateRole,
};
