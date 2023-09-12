require('dotenv').config();
const REACT_URL = process.env.REACT_URL || 'http://localhost:3030';

const configCors = (app) => {
   // Add headers before the routes are defined
   app.use(function (req, res, next) {
      // cấu hình cho phép frontend REACT_URL truy cập được data của backend
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', REACT_URL);

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
   });
};

export default configCors;