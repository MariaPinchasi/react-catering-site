import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDish, updateDish } from '../api/api';
import Form from '../components/Form';
import useForm from '../hooks/useForm';

const EditDish = () => {
    const { dishId } = useParams();
    const { handleChange, handleSubmit, setDish, formData } = useForm(updateDish)

    const fetchDish = async () => {
        const dishData = await getDish(dishId);
        setDish(dishData);
    }
    useEffect(() => {
        fetchDish();
    }, []);



    return (
        <div className="edit-dish-container">
            <h2>Edit Dish</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Update' formData={formData} />
        </div>
    )
}

export default EditDish