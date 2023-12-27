import { useContext } from "react";
import { MenuContext } from "../context/menuContext";

export const useGlobalMenuContext = () => {
    return useContext(MenuContext);
}