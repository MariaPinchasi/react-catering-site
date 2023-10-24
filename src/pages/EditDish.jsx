import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getDish, updateDish } from '../api/api';
import Form from '../components/Form';
import useForm from '../hooks/useForm';

const EditDish = () => {
    const { dishId } = useParams();

    const [dish, setDish] = useState({
        name: '',
        description: '',
        image: '',
    });
    const [errors, setErrors] = useState({
        name: null,
        description: null,
        image: null,
    });

    const fetchDish = async () => {
        const dishData = await getDish(dishId);
        setDish(dishData);
    }
    useEffect(() => {
        fetchDish();
    }, []);

    const { handleChange, handleSubmit } = useForm(dish, setDish, setErrors, updateDish)

    return (
        <div className="edit-dish-container">
            <h2>Edit Dish</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} dish={dish} errors={errors} btnText='Update' />
        </div>
    )
}

export default EditDish