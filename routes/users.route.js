import { Router } from "express";
import pool from "../database/connectionPG.js";
import controllersLogin from "../controllers/controllers.login.js";

const router = Router();

router.post('/registro', controllersLogin.register);

router.post('/login', controllersLogin.login);

router.get('/students/:cedula', controllersLogin.getStudents);

export default router;