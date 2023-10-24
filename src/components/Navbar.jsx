import { Link, NavLink } from "react-router-dom"
import { links } from "../data/data"

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1> <Link to='/' className="logo">Za'afran</Link></h1>
            <div className="links">
                <ul className="nav-links">
                    {links.map(link => {
                        const { id, url, text } = link;
                        return (
                            <li key={id}>
                                <NavLink
                                    to={url}
                                    className={({ isActive }) => isActive ? 'active' : undefined}>
                                    {text}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* <div className="log-in-and-out">
            {user && <p className="user-name">{`hello ${user.name}`}</p>}
            {!user &&
                <Link
                    to='/logIn'
                    className='btn login-btn'>
                    Log In
                </Link>
            }
            {user &&
                <Link
                    to='/'
                    className='btn login-btn'
                    onClick={logout}>
                    Log Out
                </Link>
            }
        </div> */}
        </nav>
    )
}
export default Navbar