import React from 'react'
import { useParams } from 'react-router';
import QrScanner from './QrReader';


function StudentStatus() {

    let params = useParams();

    const handleScanner = () => {
        console.log(params.cedula);

    }

    return (
        <div className='container mx-auto'>
            <button type='button' className='cursor-pointer bg-blue-600 p-2 rounded-md text-white' onClick={handleScanner}>Scanear</button>
        </div>
    );
}

export default StudentStatus;