'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Usertype extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Usertype.hasMany(models.User);
         Usertype.belongsToMany(models.Role, { through: 'Role_Usertype' });
      }
   }
   Usertype.init(
      {
         name: DataTypes.STRING,
         description: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Usertype',
      },
   );
   return Usertype;
};
