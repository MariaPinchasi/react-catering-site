import Form from "../components/Form";
import useUserForm from "../hooks/useUserForm";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Login = () => {
    const { userErr } = useGlobalContext();

    const { handleChange, handleSubmit, formDataLog } = useUserForm('login')

    return (
        <section className="edit-dish-container">
            <h2>Log In</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Log In' formData={formDataLog} />
            <p className="login-info">for admin permissions enter: user: admin, password: admin-pass</p>
            {userErr && <p className="error-message">{userErr}</p>}
        </section>
    )
}

export default Login