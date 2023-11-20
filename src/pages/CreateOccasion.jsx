import React, { useEffect, useState } from 'react'
import { getAllMenus } from '../api/api';
import useCreateOccasionForm from '../hooks/useCreateOccasionForm';
import Input from '../components/Input';
import { occasionsTypes } from '../data/data';
import { ToastContainer } from 'react-toastify';

const CreateOccasion = () => {

    const [menus, setMenus] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [query, setQuery] = useState("");
    const { occasion, checkedState, errors, handleChange, handleSubmit, handleCheckedChange } = useCreateOccasionForm(dishes)


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



    return (
        <div className="edit-dish-container">
            <h1>Create Your Own Occasion</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Occasion Type</label>
                    <select name="type" defaultValue='Casual Occasion' onChange={handleChange}>
                        {occasionsTypes.map(occType => {
                            const { id, name } = occType;
                            return (
                                <option key={id} value={name}>{name}</option>)
                        })}
                    </select>
                </div>
                <Input label='Number of Guests' type='number' name='guests' value={occasion.guests} error={errors.guests} handleChange={handleChange} />
                <Input label='Occasion Date' type='date' name='date' value={occasion.date} error={errors.date} handleChange={handleChange} />

                <div className="input-group">
                    <label>Choose your dishes</label>
                    <input
                        type="text"
                        placeholder="search..."
                        onChange={(e) => setQuery(e.target.value)} />
                    <div className="dishes-choosing-container">
                        {dishes.filter((dish) => dish.name.toLowerCase().includes(query)).map((dish, index) => {
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
                <Input label='Special Notes' type='text' name='notes' value={occasion.notes} error={errors.notes} handleChange={handleChange} />
                <button className="btn update-btn" type="submit">Create</button>
            </form>
            <ToastContainer />
        </div>
    )

}

export default CreateOccasion