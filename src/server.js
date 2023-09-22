import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config(); // dùng hàm config trong thư viện dotenv để đọc được process.env.PORT

import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';

import { createJwt, verifyToken } from '../src/middleware/JWTAction';

const app = express();
const PORT = process.env.PORT || 1997;

// test create JWT
createJwt();
let dataDecoded = verifyToken(
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hpIiwiYWdlIjoiMTgiLCJpYXQiOjE2OTUzODI0NTR9.3UGshlZaDfm77pV6NMfKJhkNF_Ywf6x8mLqniqYT_Io',
);
console.log(dataDecoded);

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
