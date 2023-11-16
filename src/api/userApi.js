import axios from "axios";

const URL = "https://651eb21444a3a8aa4768d384.mockapi.io/users";

export const postUser = (user) => {
    axios.post(URL, user)
}

export const getUsers = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (userEmail) => {
    const users = await getUsers();
    const user = users.find(user => user.email === userEmail);
    return user;
}

export const addOccasion = async (occasion, user) => {
    const userData = { ...user };
    userData.occasions.push(occasion);
    axios.put(`${URL}/${user.id}`, userData);
}