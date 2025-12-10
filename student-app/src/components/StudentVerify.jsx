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
            <h1 className="text-5xl text-zinc-700 font-bold mb-10">Datos del Estudiante</h1>
        {
            !student 
            ? <p className='font-ligth text-4xl text-zinc-700'>
                El estudiante que quiere buscar no se encuentra registrado en nuestro sistema, por favor verifique los datos suministrados.
            </p>
            : student.map((data) => <div className='grid grid-cols-2 mx-auto'>
                {data.foto_estudiante === null ? <img src={"/jnvkjdfnk-removebg-preview.png"} alt="Estudiante Imagen" width={400} height={300} /> :  <img src={"/"+data.foto_estudiante} alt="Estudiante Imagen" width={400} height={300} /> }
                <ul key={data.cedula} className='w-full grid grid-cols-2 gap-10'>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Nombre:</span>  {data.primer_nombre}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Apellido:</span> {data.primer_apellido}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Cedula:</span> {data.cedula}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Correo:</span> {data.email}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Direccion:</span> {data.direccion}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Telefono:</span> {data.telefono}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Carrera:</span> {data.carrera}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className='font-medium'>Mencion:</span> {data.mencion}
                    </li>
                    <li className='font-light text-[20px] border-1 rounded-md border-gray-100 p-3'>
                        <span className="font-medium">Status:</span>{data.activo === 1 ? "El estudiante se encuentra activo" : "El estudiante no se esncuentra activo"}</li>
                </ul>
            </div>)
        }
        </div>
    );
}

export default StudentStatus;