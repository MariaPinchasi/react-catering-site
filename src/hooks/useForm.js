import { useNavigate } from 'react-router'

const useForm = (dish, setDish, setErrors, apiFunction) => {
    const navigate = useNavigate();
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
            apiFunction(dish, dish.id);
            navigate('/');
        }
    };
    return { handleChange, handleSubmit }
}

export default useForm