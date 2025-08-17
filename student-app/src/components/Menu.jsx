import React from 'react';
import { NavLink, useNavigate } from 'react-router';

function Menu() {

    const navigate = useNavigate();

    const handleClickSession = () => {

        localStorage.clear('token');
        sessionStorage.clear('tokenSession');
        navigate('/');
    }



    return (
        <>
            <nav className='sticky top-0 left-0 rigth-0 h-[60px] w-full bg-[#3f2b96] flex items-center'>
                <button type="button" className='p-3 border-r-1 border-r-gray-300 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                </button>
                <NavLink to="/dashboard" className='font-light text-white text-3xl ml-5'>Inicio</NavLink>
            </nav>
            <aside className='bg-white w-[350px] shadow-md flex flex-col justify-start h-[640px] fixed top-[60px] bottom-0'>
                <header className='border-b-2 border-gray-300 p-3 flex flex-row gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 rounded-full text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div>
                        <h2>User</h2>
                        <p>Estudiante</p>
                    </div>
                </header>
                <ul className='relative h-screen'>
                    <li className='w-full'>
                        <NavLink to='/dashboard' className='cursor-pointer w-full text-black flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#3f3b96] hover:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 pointer-events-none hover:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span>Ver Materias</span>
                        </NavLink>
                    </li>
                    <li className='w-full'>
                        <NavLink to='/dashboard'  className='cursor-pointer w-full text-black flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#3f3b96] hover:text-white'>
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