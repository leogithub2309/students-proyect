import React, { useEffect, useState } from 'react'
import { helpHttp } from '../helpers/HttpHelper';
import Menu from './Menu';


function IngresoAlumnos() {

    const useFetch = helpHttp();

    const [ingreso, setIngreso] = useState([]);


    let url = "http://localhost:3000/studentsSingIn/";

    useEffect(() => {
        console.log(ingreso);
    }, [ingreso]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {hour: "2-digit", minute: "2-digit"});
    }


    useEffect(() => {
        
        const getData = async () => {
           await useFetch.get(url, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
           }).then((response) => {
                
                if(response.status === 202){
                    setIngreso(response.data);
                }
                
            }).catch((error) => {
                console.log(error);
            });
        }

        getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);


    return (
        
        <div>
            <Menu />
            <main className='bg-white rounded-md p-5 w-[85%] mx-auto mt-20 '>
                <h2 className='text-3xl font-bold text-center my-5'>Control de Ingreso Estudiantes</h2>
                <table className='table-fixed mx-auto w-[100%]'>
                    <thead>
                        <tr className='border-b-2 border-zinc-800'>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Nombre</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Apellido</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Cedula</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Fecha Ingreso</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Email</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Direccion</th>
                            <th className="p-3 text-gray-700 font-semibold text-lg">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingreso.length === 0 
                            ? <tr><td colSpan={ingreso.length}>No hay registros disponibles</td></tr> 
                            : ingreso.map((data) => <tr key={data.cedula} className='border-b border-gray-200'>
                                <td className='text-medium text-md font-light p-3 text-center'> {data.primer_nombre} </td>
                                <td className='text-medium text-md font-light p-3 text-center'> {data.primer_apellido} </td>
                                <td className='text-medium text-md font-light p-3 text-center'> {data.cedula} </td>
                                <td className='text-medium text-md font-light p-3 text-center'> 
                                    { formatDate(data.created_at) } 
                                </td>
                                <td className='text-medium text-md font-light p-3 text-left'> {data.email} </td>
                                <td className='text-medium text-md font-light p-3 text-center'> {data.direccion} </td>
                                <td className='text-medium text-md font-light p-3 text-center'> {data.telefono} </td>
                            </tr> )
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default IngresoAlumnos;