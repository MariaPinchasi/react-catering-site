import axios from "axios";

const URL = "https://653e1d7af52310ee6a9a96ea.mockapi.io/users";

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
