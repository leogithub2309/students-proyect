/* eslint-disable no-unused-vars */
import { useState } from 'react';
//import { helpHttp } from '../helpers/helpHTTP';

export const useForm = (initalForm, validateForm) => {
    
    const [form, setForm] = useState(initalForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validateForm(form));

    }

    return {
        form,
        errors,
        loading,
        response,
        handleBlur,
        handleChange,
        handleSubmit
    }

}