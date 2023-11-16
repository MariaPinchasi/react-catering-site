import React, { useEffect, useState } from 'react'
import { getAllMenus } from '../api/api';
import { addOccasion } from '../api/userApi';
import { useGlobalContext } from "../hooks/useGlobalContext";

const CreateOccasion = () => {
    const { user } = useGlobalContext();

    const [menus, setMenus] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [checkedState, setCheckedState] = useState(new Array(20).fill(false));
    const [occasion, setOccasion] = useState({
        type: '',
        guests: 0,
        date: '',
        dishes: [],
        notes: ''
    });

    const [errors, setErrors] = useState({
        guests: null,
        date: null,
        dishes: null,
    });

    const fetchMenus = async () => {
        const menusData = await getAllMenus();
        setMenus(menusData);
    }

    useEffect(() => {
        fetchMenus();
    }, []);

    useEffect(() => {
        setDishes(menus.flatMap(menu => menu.dishes));
        // setCheckedState(new Array(dishes.length).fill(false));
    }, [menus]);

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
        setOccasion({
            ...occasion,
            dishes: checkedDishes
        });

        let isValid = true;
        const nowDate = new Date();
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
            console.log('success');
            addOccasion(occasion, user);
        }
    }

    return (
        <div className="edit-dish-container">
            <h1>Create Your Own Occasion</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Occasion Type</label>
                    <select name="type" defaultValue='Casual Occasion' onChange={handleChange}>
                        <option value="Casual Occasion">Casual Occasion</option>
                        <option value="Elegant Occasion">Elegant Occasion</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Employee Meal">Employee Meal</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor='guest'>Number of Guests</label>
                    <input type='number' name='guests' value={occasion.guests} onChange={handleChange} />
                    <div className="error-message">{errors.guests}</div>
                </div>
                <div className="input-group">
                    <label htmlFor='data'>Occasion Date</label>
                    <input type='date' name='date' value={occasion.date} onChange={handleChange} />
                    <div className="error-message">{errors.date}</div>
                </div>
                <div className="input-group">
                    <label>Choose your dishes</label>
                    <div className="dishes-choosing-container">
                        {dishes.map((dish, index) => {
                            const { id, name, description, image } = dish;
                            return (
                                <article className="dish-container choosing-dish" key={id}>
                                    <img src={image} alt='dish img' />
                                    <div className="dish-info">
                                        <input className="checkbox"
                                            type="checkbox"
                                            name="dish"
                                            // value={name}
                                            checked={checkedState[index]}
                                            onChange={() => handleCheckedChange(index)} />
                                        <h3>{name}</h3>
                                        <p>{description}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    <div className="error-message">{errors.dishes}</div>

                </div>
                <div className="input-group">
                    <label htmlFor='notes'>Special Notes</label>
                    <input type='text' name='notes' value={occasion.notes} onChange={handleChange} />
                    <div className="error-message">{errors.notes}</div>
                </div>
                <button className="btn update-btn" type="submit">Create</button>
            </form>
        </div>
    )

}

export default CreateOccasion