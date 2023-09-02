import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

require('dotenv').config(); // dùng hàm config trong thư viện dotenv để đọc được process.env.PORT

const app = express();
const PORT = process.env.PORT || 1997;

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
   console.log(`JwtBackend app listening on port ${PORT}`);
});
