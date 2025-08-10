import React from 'react';
import { NavLink } from 'react-router';
import RegisterPage from '../pages/RegisterPages';
import { useForm } from '../hooks/useForm';
import { helpHttp } from '../helpers/HttpHelper';

const initialForm = {
    email:'',
    password: ''
}

const validationsForm = (form) =>  {

    let errors = {};

    if(!form.email.trim()){
        errors.email = "El campo 'email' es requerido";
    
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)){
        errors.email = 'El campo "email" no tiene un patron válido';
    }

    if(!form.password.trim()){
        errors.password = "El campo 'password' es requerido";
    }


    return errors;
}


function Login() {

    const {form, errors, handleChange, handleBlur} = useForm(initialForm, validationsForm);
    
    const useFetch = helpHttp();

    const handleSubmit = (e) => {

        e.preventDefault();

        useFetch.post("http://localhost:3000/login", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },

            body: form
        }).then((response) => {
            console.log(response);
        
        }).catch((err) => console.error(err))
    }


    return (
        <div className="container">
            <form action="#" autoComplete='off' className='lg:w-[500px] bg-white rounded-md p-10' onSubmit={handleSubmit}>
                <img src="../../public/jnvkjdfnk-removebg-preview.png" alt="Logo" width='200' height='200' className='mx-auto' />
                <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                    <label htmlFor="email" className='block text-md w-full font-medium tracking-[1px]'>Email</label>
                    <input type="text" name="email" id="email" placeholder='Ingrese Email' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} onBlur={handleBlur} value={form.email} />
                     {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.email}</span>}
                </div>
                <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                    <label htmlFor="password" className='block text-md w-full font-medium tracking-[1px]'>Password</label>
                    <input type="password" name="password" id="password" placeholder='Password'className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} onBlur={handleBlur} value={form.password} />
                    {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.password}</span>}
                </div>
                <button type="submit" className='bg-blue-600 w-full text-white cursor-pointer px-2 py-3 rounded-md text-center font-bold mt-5 hover:bg-blue-700'>
                    Ingresar
                </button>
                <div className="mt-5 flex items-center">
                    <p className="font-medium text-gray-600 tracking-[2px] text-sm">
                        Todavia no estas registrado?  &nbsp;
                        <NavLink to='/register' className='text-blue-600 font-light hover:underline'>Registrate</NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;

/*

"primer_nombre":"Maria", 
    "segundo_nombre":"", 
    "primer_apellido":"Hernandez", 
    "segundo_apellido":"",
    "cedula":"014",
    "telefono":"55573841", 
    "direccion":"Urb Los Ramos", 
    "id_mencion":"1",
    "id_carrera":"4",
    "email":"maria.hernandezo@gmail.com", 
    "password":"maria123", 
    "role_id":"1", 
    "activo":"1",
    "id_usuario": "18"
*/