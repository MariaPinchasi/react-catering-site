import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const showToastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
    });
}