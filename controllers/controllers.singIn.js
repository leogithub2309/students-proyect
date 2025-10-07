import pool from "../database/connectionPG.js";

const insertDataEstudentSingIn = async (req, res) => {

    let { id_estudiante } = req.body;

    if(!id_estudiante) return res.status(404).json({
        title: "Error, el id del estudiante es requerido",
        status: 404
    });

    try {
        const result = await pool.query(
            "INSERT INTO public.ingreso_alumno(id_estudiante, created_at) VALUES($1, $2)",
            [id_estudiante, new Date()]
        );

        /* if(result.rows.length === 0) return res.status(401).json({
            title: "Error",
            status: 401,
            description: "Error, no se pudo registrar el ingreso del alumno"
        }); */

        return res.status(202).json({
            title: "Estudiante Registrado",
            status: 202,
            resultId: result.rowCount
        });
        
    } catch (error) {
        console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(400).json({
            title: "Error",
            status: 400,
            error: error.message || "No se pudo agregar un nuevo usuario, verifique la informacion ingresada."
        });
    }
}

const getSingInEstudents = async (req, res) => {

    let { id_estudiante } = req.params;

    try {

        const data = await pool.query(
            "SELECT * FROM public.estudiante AS e INNER JOIN ingreso_alumno AS ia ON e.id_estudiante=ia.id_estudiante WHERE e.id_estudiante = $1",
            [id_estudiante]
        );

        if(data.rows.length === 0) return res.status(401).json({
            title: "Success",
            description: "No hay estudiantes ingresados todavía",
            status: 401
        });

        return res.status(202).json({
            title: "Estudiantes",
            status: 2020,
            data: data.rows
        })
        
    } catch (error) {
        console.error("No se pudo realizar la peticion debido a que hay un error ", error);
        return res.status(400).json({
            title: "Error",
            status: 400,
            error: error.message || "No se pudo agregar un nuevo usuario, verifique la informacion ingresada."
        });
    }

}



export default {
    insertDataEstudentSingIn,
    getSingInEstudents
}