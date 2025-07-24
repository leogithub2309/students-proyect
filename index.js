import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import controllersLogin from './controllers/controllers.login.js';
import router from './routes/users.route.js';


const app = express(),
    port = process.env.PORT || 3000;

//Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Api Routes
app.get('/', function(req, res){
    return res.status(201).json({
        title: "Main Route",
        descripcion: "Ruta Principal",
        status: 201
    });
});

app.use(router);

//Server Listen
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el http://localhost:${port}/`);
});