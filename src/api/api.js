import axios from "axios";

const URL = "https://651eb21444a3a8aa4768d384.mockapi.io/menus";
// export const getAllMenus = async () => {
//     try {
//         const res = await axios.get(URL);
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getMenu = async (menuId) => {
    try {
        const res = await axios.get(`${URL}/${menuId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDish = async (dishId) => {
    const menuId = JSON.parse(localStorage.getItem('menuType'));
    const menuData = await getMenu(menuId);
    const dishToEdit = menuData.dishes.filter(dish => (dish.id).toString() === dishId);
    return dishToEdit[0];
}

export const updateDish = async (dish, dishId) => {
    const menuId = JSON.parse(localStorage.getItem('menuType'));
    const menuData = await getMenu(menuId);
    let dishToUpdateIndex;
    const dishToUpdate = menuData.dishes.find((currentDish, i) => {
        if ((currentDish.id).toString() === dishId) {
            dishToUpdateIndex = i;
            return currentDish;
        }
    });
    menuData.dishes[dishToUpdateIndex] = dish;
    axios.put(`${URL}/${menuId}`, menuData);
}

export const addDish = async (dish) => {
    const menuId = JSON.parse(localStorage.getItem('menuType'));
    const menuData = await getMenu(menuId);
    menuData.dishes.push(dish);
    axios.put(`${URL}/${menuId}`, menuData);
}

export const deleteDish = async (dishId) => {
    const menuId = JSON.parse(localStorage.getItem('menuType'));
    const menuData = await getMenu(menuId);
    const remainingDishes = menuData.dishes.filter(dish => (dish.id).toString() !== dishId);
    menuData.dishes = remainingDishes;
    console.log(menuData);
    axios.put(`${URL}/${menuId}`, menuData);
}