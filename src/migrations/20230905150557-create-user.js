'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   // chạy cái này trong gitbash để tạo table user | running migrations
   // npx sequelize-cli db:migrate
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('User', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         email: {
            type: Sequelize.STRING,
         },
         password: {
            type: Sequelize.STRING,
         },
         username: {
            type: Sequelize.STRING,
         },
         address: {
            type: Sequelize.STRING,
         },
         phone: {
            type: Sequelize.STRING,
         },
         gender: {
            type: Sequelize.STRING,
         },
         usertypeId: {
            type: Sequelize.INTEGER,
         },

         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('User');
   },
};
