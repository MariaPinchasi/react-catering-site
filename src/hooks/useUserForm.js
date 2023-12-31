import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { useNavigate } from 'react-router'

const useUserForm = (type) => {
    const { login, register, setUserErr } = useGlobalContext();

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        password: null
    })
    const formDataReg = [
        {
            id: '1',
            label: 'User Name',
            type: 'text',
            name: 'name',
            value: userFormData.name,
            error: errors.name,
        },
        {
            id: '2',
            label: 'Email',
            type: 'email',
            name: 'email',
            value: userFormData.email,
            error: errors.email,
        },
        {
            id: '3',
            label: 'Password',
            type: 'password',
            name: 'password',
            value: userFormData.password,
            error: errors.password,
        },
    ]
    const formDataLog = formDataReg.slice(1);

    const handleChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
        setUserErr('');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const newErrors = {};
        if (type !== "login" && userFormData.name.length < 3) {
            newErrors.name = "name must bo at least 3 characters long";
            isValid = false;
        }
        if (!emailRegex.test(userFormData.email)) {
            newErrors.email = "Email not valid";
            isValid = false;
        }
        if (userFormData.password.length < 6) {
            newErrors.password = "password must bo at least 6 characters long";
            isValid = false;
        }
        setErrors(newErrors);
        if (isValid) {
            if (type === 'login') {
                login(userFormData, navigate);
            }
            else {
                register(userFormData, navigate);

            }

        }
    };
    return { handleChange, handleSubmit, formDataReg, formDataLog }


}

export default useUserForm