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
        <section className='flex flex-row justify-between items-start'>
            <Menu />
            <main className='bg-white rounded-md p-5 w-[450px]'>
                <h1>Panel Administrativo</h1>
            </main>
        </section>
    );
}

export default Dashboard;