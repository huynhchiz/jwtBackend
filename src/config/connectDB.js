const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('jwt', 'root', null, {
   host: 'localhost',
   dialect: 'mysql',
   define, //ko biết sao phải thêm vào để nó ăn cái define trong config
});

// Testing the connection to database
const connection = async () => {
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
};

export default connection;
