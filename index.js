import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express(),
    port = process.env.PORT || 3000;

//Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Api Routes


//Server Listen
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el http://localhost:${port}/`);
});