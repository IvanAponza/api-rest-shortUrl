import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import linkRouter from './routes/link.route.js';

//INITIALIZE THE SERVER
const app = express();

//SETTINGS
const PORT = 4000 || process.env.PORT;

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())

//ROUTES
app.use('/api/auth', authRouter);
app.use('/api/links', linkRouter);

//solo para elejempo de login/token refresh y persitencia del token
app.use(express.static("public"));


//INITIALIZATION THE SERVER
app.listen(PORT, () => {
    console.log('Server on port http://localhost:' + PORT);
})
