import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDish } from '../api/api';
import Form from '../components/Form';
import useForm from '../hooks/useForm';
import { useGlobalMenuContext } from '../hooks/useGlobalMenuContext';

const EditDish = () => {
    const { menuId, dishId } = useParams();
    const { handleUpdateDish } = useGlobalMenuContext();

    const { handleChange, handleSubmit, setDish, formData } = useForm(handleUpdateDish, menuId)

    const fetchDish = async () => {
        const dishData = await getDish(menuId, dishId);
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