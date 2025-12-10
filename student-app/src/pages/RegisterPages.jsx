import React from 'react';
import Register from '../components/Register';

const initialForm = {
    id_usuario: '',
    primer_nombre:'', 
    segundo_nombre:'', 
    primer_apellido:'', 
    segundo_apellido:'',
    cedula:'',
    telefono:'', 
    direccion:'', 
    id_mencion:'',
    id_carrera:'',
    email:'', 
    password:'', 
    role_id:'', 
    activo:'',
    foto_estudiante: ''
}

function RegisterPage() {
    return (
      <div className="container">
        <Register initialForm={initialForm} />
      </div>
    );
}

export default RegisterPage;