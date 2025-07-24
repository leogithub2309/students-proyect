import pool from "../database/connectionPG.js";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {

    let {email, password} = req.body;

    if(!email || !password) return res.status(404).json({
        title: "Error",
        descripcion: 'Los campos del formulario están incompletos.',
        status: 404
    });

   try {

    const result = await pool.query("SELECT * FROM public.user WHERE email = '" + email + "';");
    
    if(result.rows.length === 0) return res.status(404).json({
        title: "El usuairo no existe, por favor vuelva a intentar",
        status: 404,
        result: result.rowCount
    });

    const createTokenUser = jsonwebtoken.sign(
        {user: result.rows[0].email, rol: result.rows[0].role_id, userId: result.rows[0].id},
        process.env.SECRET_KEY,
        {expiresIn: process.env.EXPIRE_TOKEN}
    );
    
    const cookieOption = {
        MaxAge: new Date(Date.now() + process.env.EXPIRE_TOKEN *24*60*60*1000), 
        path: "/",
    }

    res.cookie("authTokenUser", createTokenUser, cookieOption);
    
    return res.status(202).json({
        title: "Success",
        status: 202,
        result: {
            createTokenUser,
            path: "/dashboard",
        }
    });
    
   } catch (error) {
        return res.status(500).json({
            title: "No se pudo conectar con la API",
            status: 500,
            error
        });
   }
}

const register = async (req, res) => {

    try{
        let { 
            primer_nombre, 
            segundo_nombre, 
            primer_apellido, 
            segundo_apellido,
            cedula,
            telefono, 
            direccion, 
            id_mencion,
            id_carrera,
            email, 
            password, 
            role_id 
        } = req.body;
    
        if(!primer_nombre || !primer_apellido || !cedula || !telefono || !direccion || !id_mencion || !email || !password || !role_id || !id_carrera) {
            return res.status(400).json({
                title: "Error",
                status: 404,
                description: "Error, los campos del formulario no pueden estar vacios."
            });
        }
    
        const data = await pool.query(
            "SELECT * FROM public.estudiante as est INNER JOIN mencion as m ON est.id_mencion=m.id_mencion INNER JOIN public.carrera as c ON est.id_carrera=c.id_carrera WHERE est.cedula ='"+cedula+"';"
        );
    
        if(data.rows.length > 0){
            return res.status(409).json({
                title: "Error",
                status: 409,// Código para conflicto (recurso ya existe)
                description: "El usuario que quiere crear, ya se encuentra registrado en la base de datos."
            });
        }   
    
        //generamos una contraseña encriptada
        const generateSalt = await bcrypt.genSalt(10),
            hashingPassword = await bcrypt.hash(password, generateSalt);

        const resultCarrera = await pool.query(
            "INSERT INTO public.user (email, password, role_id, activo) VALUES($1, $2, $3, $4)",
            [email, hashingPassword, role_id, activo]
        );

        if(!resultCarrera.rows.length === 0){
            throw new Error('No se pudo insertar un nuevo Usuario.');
        }
    
        const resultEstudiante = await pool.query(
            "INSERT INTO public.estudiante (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cedula, telefono, direccion, id_carrera, id_mencion) VALUES($1, $2, $3, $4, $5, $6, $7)",
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cedula, telefono, direccion, id_carrera, id_mencion]
        );

        if(!resultEstudiante.rows.length === 0){
            throw new Error('No se pudo insertar un nuevo Estudiante.');
        }

        if(resultCarrera.rowCount !== 0 && resultEstudiante.rowCount !== 0){
            return res.status(201).json({
                title: "Success",
                status: 201,
                description: "El usuario se ha registrado de manera exitosa!!!",
                result: resultEstudiante.rows
            });
        }
       
        
    }catch(error){
        console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(404).json({
            title: "Error",
            status: 404,
            error: error.message || "No se pudo agregar un nuevo usuario, verifique la informacion ingresada."
        });
    }
}

export default {
    login,
    register
}