import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import MyContext from '../context/MyContext';
export default function Navbar() {
    const navigate = useNavigate();
    const {dispatch,LoggedIn} = useContext(MyContext)
    const logout = async () => {
        axios.defaults.withCredentials = true;
        axios.delete(`${import.meta.env.VITE_BASE_URL}/logout`);
        localStorage.setItem('LoggedIn','false');
        dispatch({
            type:'SET_LOGGEDIN',
            payload: 'false'
        })
        navigate('/');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-danger navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            {
                                LoggedIn==='true' ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} aria-current="page" to="/profile">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === "/wallet" ? "active" : ""}`} aria-current="page" to="/wallet">Wallet</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" aria-current="page" onClick={logout}>Logout</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === "/register" ? "active" : ""}`} aria-current="page" to="/register">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
