import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDish, getMenu } from "../api/api.js";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Occasion = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState({});
    const [dishes, setDishes] = useState([]);
    const { user, isApiUpdates, setIsApiUpdates } = useGlobalContext();

    useEffect(() => {
        const fetchMenu = async () => {
            const menuData = await getMenu(menuId);
            setMenu(menuData);
            setDishes(menuData.dishes);
        }
        fetchMenu();
    }, [menuId, isApiUpdates]);

    const handleDelete = (dishId) => {
        deleteDish(menuId, dishId);
        setIsApiUpdates(!isApiUpdates);
        navigate(`/Message`);
    }
    return (
        <>
            <header className={`container type-info ${menuId}`}>
                <section className="type-info-content">
                    <h1>{menu.name}</h1>
                    <p>{menu.description}</p>
                </section>
            </header>
            <section className="container menu-container">
                <h2 className="menu-header">MENU</h2>
                <div className="menu-info">
                    {dishes.map(dish => {
                        const { id, name, description, image } = dish;
                        return (
                            <article className="dish-container" key={id}>
                                <img src={image} alt='dish img' />
                                <div className="dish-info">
                                    <h3>{name}</h3>
                                    <p>{description}</p>
                                    {user?.isAdmin &&
                                        <Link to={`/${menuId}/dishes/${id}/edit`} className="btn small-btn">Edit</Link>}
                                    {user?.isAdmin &&
                                        <button onClick={() => handleDelete(id)} className="btn small-btn">Delete</button>}
                                </div>
                            </article>
                        )
                    })}
                </div>
                {user?.isAdmin &&
                    <Link to={`/${menuId}/add`} className="btn small-btn add-btn">Add Dish</Link>}
            </section>
        </>
    )
}

export default Occasion