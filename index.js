import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routes/auth.js';

//INITIALIZE THE SERVER
const app = express();

//SETTINGS
const PORT = 4000 || process.env.PORT;

//MIDDLEWARES
app.use(express.json());


//ROUTES
app.use('/api/auth', authRouter);

//INITIALIZATION THE SERVER
app.listen(PORT, () => {
    console.log('Server on port http://localhost:' + PORT);
})