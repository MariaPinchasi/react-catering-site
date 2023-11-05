import { getUser } from "../api/userApi";
import Form from "../components/Form";
import useUserForm from "../hooks/useUserForm";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from 'react-router'
import { useState } from "react";

const Login = () => {
    const { setUser } = useGlobalContext();
    const navigate = useNavigate();

    const [userErr, setUserErr] = useState('');

    const login = async (userFormData) => {
        const userData = await getUser(userFormData.email);
        if (!userData) {
            setUserErr("Email does not exist in our systems, Please register");
        }
        else {
            if (userData.name !== userFormData.name || userData.password !== userFormData.password) {
                setUserErr("Name or password doesn't match the email provided");
            }
            else {
                setUser(userData);
                navigate('/');
            }
        }
    }
    const { handleChange, handleSubmit, formData } = useUserForm(login)

    return (
        <section className="edit-dish-container">
            <h2>Log In</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Log In' formData={formData} />
            <p className="login-info">for admin permissions enter: user: admin, password: adminpass</p>
            {userErr && <p className="error-message">{userErr}</p>}
        </section>
    )
}

export default Login