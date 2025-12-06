import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import QrScanner from './QrReader';
import { helpHttp } from '../helpers/HttpHelper';


function StudentStatus() {

    const { cedula } = useParams();
    
    const [student, setStudent] = useState([]);

    const [idEstudiante, setIdEstudiante] = useState(null);

    useEffect(() => {
        const useFetch = helpHttp();
        
        const insertStudents = async () => {
            const insertStudent = await useFetch.post(`http://localhost:3000/insertStudent`, {
                headers: {
                    "Content-Type":"application/json; charset=UTF-8"
                },
                body: {
                    id_estudiante: idEstudiante
                }
            });
                    
            if(insertStudent) return;
        }
        insertStudents();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idEstudiante]);
   

    useEffect(() => {
        const useFetch = helpHttp();
        const url = "http://localhost:3000/";

        const getData = async () => {
            try {
                const response = await useFetch.get(`${url}students/${cedula}`, {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                });

                if (response.data) {
                    setStudent(response.data);
                    setIdEstudiante(response.data[0].id_estudiante);
                } else {
                    setStudent(null); // Establecer el estado a nulo si no se encuentran datos
                }
            } catch (err) {
                console.error("Error al obtener los datos del estudiante:", err);
                setStudent(null); // También establecer el estado a nulo en caso de error
            }
        };

        // Asegúrate de incluir 'getData' como una dependencia del 'useEffect'
        // si no lo está. Aunque en este caso es una función interna, es una buena práctica.
        getData();

    }, [cedula]);
    return (
        <div className='flex flex-col justify-center items-center gap-5 w-[90%] mt-10 min-h-[580px] mx-auto bg-white rounded-lg p-6 shadow-md'>
            <h1 className="text-5xl text-zinc-700 font-light">Datos del Estudiante</h1>
        {
            !student 
            ? <p className='font-ligth text-4xl text-zinc-700'>
                El estudiante que quiere buscar no se encuentra registrado en nuestro sistema, por favor verifique los datos suministrados.
            </p>
            : student.map((data) => <ul key={data.cedula} className='w-full grid grid-cols-3 gap-10 mx-auto'>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'
                >
                    {data.foto_estudiante === null ? '' :  <img src={"../../public/"+data.foto_estudiante} alt="Estudiante Imagen"  /> }
                </li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Nombre: {data.primer_nombre}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Apellido: {data.primer_apellido}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Cedula: {data.cedula}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Correo: {data.email}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Direccion: {data.direccion}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Telefono: {data.telefono}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Mencion: {data.mencion}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Carrera: {data.carrera}</li>
                <li className='font-medium text-[20px] border-1 rounded-md border-gray-300 bg-gray-200 p-3'>Status: {data.activo === 1 ? "El estudiante se encuentra activo" : "El estudiante no se esncuentra activo"}</li>
            </ul>)
        }
        </div>
    );
}

export default StudentStatus;