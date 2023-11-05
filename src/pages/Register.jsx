import { useState } from "react";
import { getUser, postUser } from "../api/userApi";
import Form from "../components/Form";
import useUserForm from "../hooks/useUserForm";
import { useNavigate } from 'react-router'

const Register = () => {
    const navigate = useNavigate();
    const [userErr, setUserErr] = useState('');

    const register = async (userFormData) => {
        const registeredUser = await getUser(userFormData.email);
        if (registeredUser) {
            setUserErr('Email found in our system, please log in');
        }
        else {
            postUser(userFormData);
            navigate('/Login');
        }
    }
    const { handleChange, handleSubmit, formData } = useUserForm(register)

    return (
        <section className="edit-dish-container">
            <h2>Registration</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Join' formData={formData} />
            <p className="login-info">for admin permissions enter: user: admin, password: admin-pass</p>
            {userErr && <p className="error-message">{userErr}</p>}
        </section>
    )
}

export default Register