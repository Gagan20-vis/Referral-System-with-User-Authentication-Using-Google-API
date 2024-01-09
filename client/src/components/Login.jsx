import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function Login() {
    const { dispatch } = useContext(MyContext)
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/profile`)
            .then(res => {
                if (res.data && res.data.currUser) navigate('/profile')
                else navigate('/login')
            })
            .catch(err => console.log(err));
    }, []);
    const onSubmit = e => {
        e.preventDefault();
        if (!user.email) document.getElementById('emailHelp').style.visibility = 'visible';
        if (!user.password) document.getElementById('passwordHelp').style.visibility = 'visible';
        else {
            let alert = null;
            axios.defaults.withCredentials = true;
            axios.post(`${import.meta.env.VITE_BASE_URL}/login`,JSON.stringify(user),{
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                if (!res.data.success)
                        if (res.data.field === 'user') alert = "Please Registered yourself !";
                        else if (res.data.field === 'verify') alert = 'User is not Verify yet!';
                        else if (res.data.field === 'password') alert = 'Password is Incorrect';
                        else if (res.data.field === 'error') alert = 'Internal Server Error';
                    if (alert)
                        dispatch({
                            type: 'SET_ALERT',
                            payload: alert,
                            success: 'false'
                        })
                    else {
                        dispatch({
                            type: 'SET_LOGGEDIN',
                            payload: 'true'
                        })
                        localStorage.setItem('LoggedIn', 'true');
                        navigate('/profile')
                    }
            })
        }
    }
    const onChange = e => {
        if (document.getElementById(e.target.name + 'Help').style.visibility == 'visible') document.getElementById(e.target.name + 'Help').style.visibility = 'hidden'
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-4 px-5 py-3' style={{ width: '40%', borderRadius: '10px', background: '#1e1e1e', color: 'white' }}>
            <h3 className='d-flex justify-content-center align-item-center'>Login</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input autoComplete="off" type="email" value={user.email} onChange={onChange} className="form-control" id="email" name='email' style={{ borderRadius: '50px' }} />
                    <div id="emailHelp" className="form-text" style={{ color: "red", visibility: 'hidden' }}>Please Enter an Email *</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input autoComplete="off" type="password" value={user.password} onChange={onChange} className="form-control" id="password" name='password' style={{ borderRadius: '50px' }} />
                    <div id="passwordHelp" className="form-text" style={{ color: "red", visibility: 'hidden' }}>Please Enter an Password *</div>
                </div>
                <div className='d-grid gap-2 col-6 mx-auto my-3'>
                    <button type="submit" className="btn btn-outline-danger" style={{ borderRadius: '50px' }}>Login</button>
                </div>
            </form>
        </div>
    )
}
