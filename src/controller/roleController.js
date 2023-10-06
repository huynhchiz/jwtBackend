import roleApiService from '../service/roleApiService';

const readRole = async (req, res) => {
   try {
      if (req.query.page && req.query.limit) {
         let page = req.query.page;
         let limit = req.query.limit;

         let data = await roleApiService.getRoles(+page, +limit);
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      } else {
         return res.status(200).json({
            EM: 'Need page and limit',
            EC: -1,
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

const deleteRole = async (req, res) => {
   try {
      let data = await roleApiService.deleteRole(req.body.id);
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

const updateRole = async (req, res) => {
   try {
      if (!req.body.currentId || !req.body.description) {
         console.log(req.body);
         return res.status(200).json({
            EM: 'Missing required parameters!',
            EC: '1',
            DT: '',
         });
      } else {
         // service: update role
         let data = await roleApiService.updateRole(req.body);

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

const getRolesByUsertype = async (req, res) => {
   try {
      let id = req.params.usertypeId;
      let data = await roleApiService.getRolesByUsertype(id);
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

const assignRolesToUsertype = async (req, res) => {
   try {
      let data = await roleApiService.assignRolesToUsertype(req.body);
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
   readRole,
   createRole,
   deleteRole,
   updateRole,
   getRolesByUsertype,
   assignRolesToUsertype,
};
