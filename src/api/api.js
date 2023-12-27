import axios from "axios";

const URL = "https://651eb21444a3a8aa4768d384.mockapi.io/menus";
export const getAllMenus = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
}
export const getMenu = async (menuId) => {
    try {
        const res = await axios.get(`${URL}/${menuId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDish = async (menuId, dishId) => {
    try {
        const menuData = await getMenu(menuId);
        const dishToEdit = menuData.dishes.find(dish => (dish.id).toString() === dishId.toString());
        return dishToEdit;
    } catch (error) {
        console.log(error);
    }
}

export const updateDish = async (dish, menuId, dishId) => {
    try {
        const menuData = await getMenu(menuId);
        let dishToUpdateIndex;
        const dishToUpdate = menuData.dishes.find((currentDish, i) => {
            if ((currentDish.id).toString() === dishId.toString()) {
                dishToUpdateIndex = i;
                return currentDish;
            }
        });
        menuData.dishes[dishToUpdateIndex] = dish;
        await axios.put(`${URL}/${menuId}`, menuData);
    } catch (error) {
        console.log(error);
    }
}

export const addDish = async (dish, menuId) => {
    try {
        const menuData = await getMenu(menuId);
        menuData.dishes.push(dish);
        await axios.put(`${URL}/${menuId}`, menuData);
    } catch (error) {
        console.log(error);
    }
}

export const deleteDish = async (menuId, dishId) => {
    try {
        const menuData = await getMenu(menuId);
        const remainingDishes = menuData.dishes.filter(dish => (dish.id).toString() !== dishId.toString());
        menuData.dishes = remainingDishes;
        await axios.put(`${URL}/${menuId}`, menuData);
    } catch (error) {
        console.log(error);
    }
}