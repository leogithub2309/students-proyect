import React from 'react';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';

function Menu() {

    const navigate = useNavigate();

    const sidebarMenu = useRef();

    const handleClickMenu = (e) => {

        e.preventDefault();
        sidebarMenu.current.classList.toggle('translate-x-[-300px]');
    }


    const handleClickSession = () => {

        localStorage.clear('token');
        sessionStorage.clear('tokenSession');
        navigate('/');
    }

    const session = sessionStorage.getItem('tokenSession').split('.');

    let parseObj = JSON.parse(window.atob(session[1]));

    return (
        <>
            <nav className='sticky top-0 left-0 rigth-0 h-[60px] w-full bg-[#3f2b96] flex items-center'>
                <button type="button"  className='p-3 border-r-1 border-r-gray-300 cursor-pointer' onClick={handleClickMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                </button>
                <NavLink to="/dashboard" className='font-light text-white text-3xl ml-5'>Inicio</NavLink>
            </nav>
            <aside className='bg-white w-[300px] shadow-md flex flex-col justify-start transition-all translate-x-[-300px] h-[640px] fixed top-[60px] bottom-0' ref={sidebarMenu}>
                <header className='border-b-2 border-gray-300 p-5 flex flex-row gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 rounded-full text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div>
                        <h2 className='font-semibold text-lg'>{ parseObj['user'] }</h2>
                        <p className='text-gray-400 text-sm'>{ parseObj['rol'] === 2 ? 'Administrador' : 'Estudiante' }</p>
                    </div>
                </header>
                <ul className='relative h-screen'>
                    <li className='w-full'>
                        <NavLink to='/ingreso-alumno'  className='cursor-pointer w-full text-black flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#3f3b96] hover:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 pointer-events-none hover:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <span>Entradas</span>
                        </NavLink>
                    </li>
                    <li className='absolute bottom-0 w-full'>
                        <button type="button" className='cursor-pointer w-full px-5 py-3 text-black transition-all flex items-center gap-3 hover:bg-[#3f3b96] hover:text-white' onClick={handleClickSession}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 pointer-events-none hover:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            <span>Cerrar Session</span>
                        </button>
                    </li>
                </ul>
            </aside>        
        </>
    );
}

export default Menu;