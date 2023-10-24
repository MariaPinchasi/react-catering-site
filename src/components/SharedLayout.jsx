import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const SharedLayout = () => {
    return (
        <>
            <div className="container">
                <Navbar />
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