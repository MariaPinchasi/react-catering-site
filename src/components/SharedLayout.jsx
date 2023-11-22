import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useGlobalContext } from "../hooks/useGlobalContext";


const SharedLayout = () => {
    const { user } = useGlobalContext();

    return (
        <>
            <div className="container">
                <Navbar />
                {!user && <section className="login-request">
                    <h1>LOGIN TO CREATE YOUR CUSTOM OCCASION</h1>
                </section>}
                <main>
                    <Outlet />
                </main>
                <footer className="footer">
                    <p>Za'afran Catering &copy; 2023, All RIghts Reserved</p>
                </footer>
            </div>
        </>
    )
}

export default SharedLayout