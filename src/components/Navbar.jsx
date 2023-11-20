import { Link, NavLink } from "react-router-dom"
import { links } from "../data/data"
import { useGlobalContext } from "../hooks/useGlobalContext";

const Navbar = () => {
    const { user, setUser } = useGlobalContext();

    return (
        <nav className="navbar">
            <h1> <Link to='/' className="logo">Za'afran</Link></h1>
            <div className="links">
                <ul className="nav-links">
                    {links.map(link => {
                        const { id, url, text, isUserRequired } = link;
                        return (
                            <li key={id}>
                                {(!isUserRequired || user) && <NavLink
                                    to={url}
                                    className={({ isActive }) => isActive ? 'active' : undefined}>
                                    {text}
                                </NavLink>}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="log-in-and-out">
                {user && <p className="user-name">{`hello ${user.name}`}</p>}
                {!user &&
                    <Link
                        to='/login'
                        className='btn small-btn'>
                        Log In
                    </Link>
                }
                {!user &&
                    <Link
                        to='/Register'
                        className='register'>
                        Register
                    </Link>
                }
                {user &&
                    <Link
                        to='/'
                        className='btn small-btn'
                        onClick={() => {
                            localStorage.removeItem('userData')
                            setUser(null)
                        }}>
                        Log Out
                    </Link>
                }
            </div>
        </nav>
    )
}
export default Navbar