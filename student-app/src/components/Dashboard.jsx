import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Menu from './Menu';

function Dashboard() {

    const navigate = useNavigate();

    useEffect(()=> {

        if(!localStorage.getItem("token") || !sessionStorage.getItem("tokenSession")){
            navigate('/');
        }



    }, [navigate]);

    return ( 
        <section className='@container'>
            <Menu />
            <main className='bg-white rounded-md p-5 w-[85%] mx-auto mt-20'>
                <h1 className='text-4xl font-light'>Bienvenidos al panel de control</h1>

            </main>
        </section>
    );
}

export default Dashboard;