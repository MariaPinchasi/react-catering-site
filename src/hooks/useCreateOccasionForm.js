import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useGlobalContext } from "./useGlobalContext";
import { addOccasion } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const useCreateOccasionForm = (dishes) => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    const [checkedState, setCheckedState] = useState(new Array(50).fill(false));
    const [occasion, setOccasion] = useState({
        id: uuid().slice(0, 8),
        type: 'Casual Occasion',
        guests: 0,
        date: '',
        dishes: [],
        notes: '',
        isApproved: false,
    });

    const [errors, setErrors] = useState({
        guests: null,
        date: null,
        dishes: null,
    });
    const handleChange = (e) => {
        setOccasion({
            ...occasion,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };

    const handleCheckedChange = (position) => {
        setErrors(prevState => (
            {
                ...prevState,
                dishes: null
            }));
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkedDishes = [];
        dishes.forEach((dish, i) => {
            if (checkedState[i] === true) {
                checkedDishes.push(dish);
            }
        })

        // setOccasion({
        //     ...occasion,
        //     dishes: checkedDishes,
        // })
        occasion.dishes = checkedDishes;

        let isValid = true;
        const newErrors = {};
        if (occasion.guests < 5) {
            newErrors.guests = "We provide catering for at least 5 guests";
            isValid = false;
        }
        if (checkedDishes.length < 3) {
            newErrors.dishes = "Must choose at least 3 dishes";
            isValid = false;
        }
        if (new Date(occasion.date) < new Date() || occasion.date === '') {
            newErrors.date = "Pick a future date";
            isValid = false;
        }
        setErrors(newErrors);
        if (isValid) {
            addOccasion(occasion, user);
            navigate('/myOccasions');
        }
    }
    return { occasion, checkedState, errors, handleChange, handleSubmit, handleCheckedChange }
}

export default useCreateOccasionForm