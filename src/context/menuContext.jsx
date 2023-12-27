import { createContext, useState } from "react";
import { addDish, deleteDish, getMenu, updateDish } from "../api/api.js";
import { showToastError } from "../utils.js";

export const MenuContext = createContext();


export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState({});
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchMenu = async (menuId) => {
        const menuData = await getMenu(menuId);
        if (!menuData) {
            showToastError("Error fetching the menu, check the URL");
        }
        setMenu(menuData);
        setDishes(menuData.dishes);
        setIsLoading(false);
    }

    const handleDelete = async (menuId, dishId) => {
        try {
            await deleteDish(menuId, dishId);
            fetchMenu(menuId);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddDish = async (dish, menuId) => {
        try {
            await addDish(dish, menuId);
            fetchMenu(menuId);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateDish = async (dish, menuId, dishId) => {
        try {
            await updateDish(dish, menuId, dishId);
            fetchMenu(menuId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MenuContext.Provider
            value={{
                fetchMenu,
                menu,
                dishes,
                isLoading,
                handleDelete,
                handleAddDish,
                handleUpdateDish
            }}>
            {children}
        </MenuContext.Provider>
    );
}