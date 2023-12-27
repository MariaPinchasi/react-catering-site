import { useNavigate } from 'react-router'
import { useState } from 'react'
import { v4 as uuid } from "uuid";

const useForm = (apiFunction, menuId) => {
    const navigate = useNavigate();

    const [dish, setDish] = useState({
        id: uuid().slice(0, 8),
        name: '',
        description: '',
        image: '',
    });

    const [errors, setErrors] = useState({
        name: null,
        description: null,
        image: null,
    });

    const formData = [
        {
            id: '1',
            label: 'Name',
            type: 'text',
            name: 'name',
            value: dish.name,
            error: errors.name,
        },
        {
            id: '2',
            label: 'Description',
            type: 'text',
            name: 'description',
            value: dish.description,
            error: errors.description,
        },
        {
            id: '3',
            label: 'Image',
            type: 'text',
            name: 'image',
            value: dish.image,
            error: errors.image,
        },
    ]
    const handleChange = (e) => {
        setDish({
            ...dish,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const imgRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|0))/;
        const newErrors = {};
        if (dish.name.length < 3) {
            newErrors.name = "name must bo at least 3 characters long";
            isValid = false;
        }
        if (dish.description.length < 10) {
            newErrors.description = "description must bo at least 10 characters long";
            isValid = false;
        }
        if (!imgRegex.test(dish.image)) {
            newErrors.image = "img url is not valid";
            isValid = false;
        }
        setErrors(newErrors);
        if (isValid) {
            apiFunction(dish, menuId, dish.id);
            navigate(`/${menuId}`);
        }
    };
    return { handleChange, handleSubmit, setDish, formData }
}

export default useForm