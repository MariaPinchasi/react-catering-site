import Form from "../components/Form";
import useUserForm from "../hooks/useUserForm";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Register = () => {
    const { userErr } = useGlobalContext();

    const { handleChange, handleSubmit, formDataReg } = useUserForm();

    return (
        <section className="edit-dish-container">
            <h2>Registration</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Join' formData={formDataReg} />
            {userErr && <p className="error-message">{userErr}</p>}
        </section>
    )
}

export default Register