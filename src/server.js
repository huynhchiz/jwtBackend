import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config(); // dùng hàm config trong thư viện dotenv để đọc được process.env.PORT

import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';

const app = express();
const PORT = process.env.PORT || 1997;

// config CORS
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Testing the connection
// connection();

// init web routes
initWebRoutes(app);

// init api
initApiRoutes(app);

app.listen(PORT, () => {
   console.log(`JwtBackend app listening on port ${PORT}`);
});
