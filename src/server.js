require('dotenv').config(); // dùng hàm config trong thư viện dotenv để đọc được process.env.PORT
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import configViewEngine from './config/viewEngine';
import configCors from './config/cors';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';

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

// config cookie parser
app.use(cookieParser());

// init web routes
initWebRoutes(app);
// init api
initApiRoutes(app);

// req => middleware => res
app.use((req, res) => {
   // ko tim thay trang (url)
   res.send('404 not found');
});

app.listen(PORT, () => {
   console.log(`JwtBackend app listening on port ${PORT}`);
});
