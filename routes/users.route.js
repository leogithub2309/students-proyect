import { Router } from "express";
import pool from "../database/connectionPG.js";
import controllersLogin from "../controllers/controllers.login.js";
import controllersSingIn from "../controllers/controllers.singIn.js";

const router = Router();

router.post('/registro', controllersLogin.register);

router.post('/login', controllersLogin.login);

router.get('/students/:cedula', controllersLogin.getStudents);

router.post('/insertStudent', controllersSingIn.insertDataEstudentSingIn);

router.get('/studentsSingIn/:id', controllersSingIn.getSingInEstudents);

export default router;