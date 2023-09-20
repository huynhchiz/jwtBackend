import genderApiService from '../service/genderApiService';

const readGender = async (req, res) => {
   try {
      let data = await genderApiService.getAllGender();
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
   readGender,
};