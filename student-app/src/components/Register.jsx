import React from 'react';
import '../App.css';
import { NavLink } from 'react-router';
import { useForm } from '../hooks/useForm';
import { helpHttp } from '../helpers/HttpHelper';


const validationsForm = (form) => {

    let errors = {};

    if(!form.primer_nombre.trim()){
        errors.primer_nombre = 'El campo "primer nombre" es requerido';
    
    }else if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.primer_nombre)){
         errors.primer_nombre = 'El campo "primer nombre" no tiene un patron válido';
    }

    /* if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.segundo_nombre)){
         errors.segundo_nombre = 'El campo "segundo nombre" no tiene un patron válido';
    } */

    if(!form.primer_apellido.trim()){
        errors.primer_apellido = 'El campo "primer apellido" es requerido';
    
    }else if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.primer_apellido)){
         errors.primer_apellido = 'El campo "primer apellido" no tiene un patron válido';
    }

   /*  if(!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.segundo_apellido)){
         errors.segundo_apellido = 'El campo "segundo_apellido" no tiene un patron válido';
    } */

    if(!form.cedula.trim()){
        errors.cedula = 'El campo "cedula" es requerido';
    
    }else if(!/[0-9]/.test(form.cedula)){
        errors.cedula = 'El campo "cedula" no tiene un patron válido';
    }

    if(!form.telefono.trim()){
        errors.telefono = 'El campo "telefono" es requerido';
    
    }else if(!/[0-9]+$/.test(form.telefono)){
         errors.telefono = 'El campo "telefono" no tiene un patron válido';
    }

    if(!form.email.trim()){
        errors.email = 'El campo "email" es requerido';
    
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)){
        errors.email = 'El campo "email" no tiene un patron válido';
    }

    if(!form.password.trim()){
        errors.password = 'El campo "password" es requerido';
    
    }else if(!/^[A-Za-z0-9ÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.password)){
        errors.password = 'El campo "password" no tiene un patron válido';
    }

    if(!form.id_mencion.trim()){
        errors.id_mencion = 'El campor "meción" no puede estar vacío';
    }

    if(!form.id_carrera.trim()){
        errors.id_carrera = 'El campor "carrera" no puede estar vacío';
    }

    if(!form.role_id.trim()){
        errors.role_id = 'El campor "role" no puede estar vacío';
    }

    if(!form.direccion.trim()){
        errors.direccion = 'El campor "direccion" no puede estar vacío';
    }


    return errors;
}

function Register({ initialForm }) {

    const {form, errors, handleChange, handleBlur} = useForm(initialForm, validationsForm);

    const useFetch = helpHttp();

    const handleChangeImage = (e) => {

        const file = e.target.files[0];

        if(file){
            form.foto_estudiante = file.name;
        }else{
            form.foto_estudiante = undefined;
        }
    }

    

    const handleSubmit = (e) => {

        let cont = 18;

        e.preventDefault();

        form.id_usuario = (cont + 1).toString();

        useFetch.post("http://localhost:3000/registro", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },

            body: form
        }).then((response) => {
            console.log(response);

            if(response){
                alert("Estudiante registrado con exito!!!");
                e.target.reset();
            }
        
        }).catch((err) => console.error(err));


       console.log(form);

        e.target.reset();
    }

    return (
       <form action="#" autoComplete='off' className='lg:w-[90%] md:w-full bg-white rounded-md p-10 mx-auto' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="primer_nombre" className='block text-md w-full font-medium tracking-[1px]'>Primer Nombre</label>
                        <input type="text" name="primer_nombre" id="primer_nombre" placeholder='Ingrese Nombre' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600'
                        onChange={handleChange} onBlur={handleBlur} value={form.primer_nombre}
                        />
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.primer_nombre}</span>}
                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="segundo_nombre" className='block text-md w-full font-medium tracking-[1px]'>Segundo Nombre</label>
                        <input type="text" name="segundo_nombre" id="segundo_nombre" placeholder='Segundo Nombre (opcional)' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} onBlur={handleBlur} value={form.segundo_nombre}/>
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.segundo_nombre}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="primer_apellido" className='block text-md w-full font-medium tracking-[1px]'>Primer Apellido</label>
                        <input type="text" name="primer_apellido" id="primer_apellido" placeholder='Ingrese Primer Apellido' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} onBlur={handleBlur} value={form.primer_apellido}/>
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.primer_apellido}</span>}
                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="segundo_apellido" className='block text-md w-full font-medium tracking-[1px]'>Segundo Apellido</label>
                        <input type="text" name="segundo_apellido" id="segundo_apellido" placeholder='Segundo Apellido (opcional)' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} onBlur={handleBlur} value={form.segundo_apellido}/>
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.segundo_apellido}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="cedula" className='block text-md w-full font-medium tracking-[1px]'>Cédula</label>
                        <input type="text" name="cedula" id="cedula" placeholder='e.g V-12345678' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600'
                        onChange={handleChange} value={form.cedula} onBlur={handleBlur} maxLength={8} />
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.cedula}</span>}
                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="telefono" className='block text-md w-full font-medium tracking-[1px]'>Teléfono</label>
                        <input type="text" name="telefono" id="telefono" placeholder='e.g 0412000000' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600'  
                        onChange={handleChange} value={form.telefono} onBlur={handleBlur} maxLength={11}/>
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.telefono}</span>}

                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="direccion" className='block text-md w-full font-medium tracking-[1px]'>Dirección</label>
                        <input type="text" name="direccion" id="direccion" placeholder='e.g Av 123' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChange} value={form.direccion} onBlur={handleBlur} />
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.direccion}</span>}
                    </div>
                </div>
                 <div className="grid grid-cols-2 items-center gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="id_carrera" className='block text-md w-full font-medium tracking-[1px]'>Carrera</label>
                        <select name="id_carrera" id="id_carrera" className='outline-1 outline-gray-400 rounded-md px-4 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' required onBlur={handleBlur}  onChange={handleChange} value={form.id_carrera}>
                            <option value=""></option>
                            <option value="1">Fisioterapia</option>
                            <option value="2">Ingenieria Agropecuaria</option>
                            <option value="3">Veterinaria</option>
                            <option value="4">Administración</option>
                            <option value="5">Educación</option>
                        </select>
                    </div>
                     <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="id_mencion" className='block text-md w-full font-medium tracking-[1px]'>Mención</label>
                        <select name="id_mencion" id="id_mencion" className='outline-1 outline-gray-400 rounded-md px-4 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' required  onChange={handleChange} onBlur={handleBlur} value={form.id_mencion}>
                            <option value=""></option>
                            <option value="1">Mercadeo</option>
                            <option value="2">Informatica</option>
                            <option value="3">RR-HH</option>
                            <option value="4">Recursos Materiales y Financieros</option>
                            <option value="5">Ingles</option>
                            <option value="6">Integral</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="email" className='block text-md w-full font-medium tracking-[1px]'>Email</label>
                        <input type="text" name="email" id="email" placeholder='Ingrese Email' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onBlur={handleBlur} onChange={handleChange} value={form.email} />
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.email}</span>}
                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="password" className='block text-md w-full font-medium tracking-[1px]'>Password</label>
                        <input type="password" name="password" id="password" placeholder='Password' className='outline-1 outline-gray-400 rounded-md px-2 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onBlur={handleBlur} onChange={handleChange} value={form.password} />
                        {errors &&  <span className='text-sm text-red-600 py-0 mt-[-10px] text-start'>{errors.password}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-3">
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="role_id" className='block text-md w-full font-medium tracking-[1px]'>Rol</label>
                        <select name="role_id" id="role_id" className='outline-1 outline-gray-400 rounded-md px-4 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' required onBlur={handleBlur} onChange={handleChange} value={form.role_id}>
                            <option value=""></option>
                            <option value="1">Estudiante</option>
                            <option value="2">Profesor</option>
                        </select>
                    </div>
                    <div className="mb-3 flex flex-col gap-3 justify-center items-start">
                        <label htmlFor="activo" className='block text-md w-full font-medium tracking-[1px]'>Estado</label>
                        <select name="activo" id="activo" className='outline-1 outline-gray-400 rounded-md px-4 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' required onBlur={handleBlur} onChange={handleChange} value={form.activo}>
                            <option value=""></option>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="foto_estudiante" className='block text-md w-full font-medium tracking-[1px] mb-3'>Foto Estudiante</label>
                    <input type="file" name="foto_estudiante" id="foto_estudiante" className='outline-1 outline-gray-400 rounded-md px-4 py-3 w-full transition-all focus:outline-2 focus:outline-blue-600' onChange={handleChangeImage} value={form.foto_estudiante} />
                    <span className='text-[12px] font-bold'>Foto tipo carnet</span>
                </div>
                <div className="flex flex-row gap-3">
                    <button type='submit' className='bg-blue-600 text-white text-center px-3 py-4 rounded-md cursor-pointer hover:bg-blue-800'>Registrarse</button>
                    <NavLink to='/' type='button' className='flex items-center bg-black text-white cursor-pointer rounded-md px-3 py-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg> &nbsp;
                        Regresar
                    </NavLink>
                </div>
            </form>
    );
}

export default Register;