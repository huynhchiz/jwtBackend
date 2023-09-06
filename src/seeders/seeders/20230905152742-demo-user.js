'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
       */

      await queryInterface.bulkInsert(
         'Users',
         [
            {
               email: 'John Doe',
               password: 'pas1',
               username: 'fake1',
            },
            {
               email: 'John Doe2',
               password: 'pas2',
               username: 'fake2',
            },
            {
               email: 'John Doe3',
               password: 'pas3',
               username: 'fake3',
            },
         ],
         {},
      );
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};