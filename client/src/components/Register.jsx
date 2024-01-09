import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/MyContext';
import axios from 'axios'
export default function Register() {
    const navigate = useNavigate();
    const { dispatch } = useContext(MyContext);
    const [user, setUser] = useState({ email: '', password: '', username: '', number: '', refer: '' });
    const [confirmPasssword, setConfirmPassword] = useState('');
    const onChange = (e) => {
        if (e.target.name !== "refer") document.getElementById(e.target.name + 'Prompt').style.visibility = 'hidden';
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!user.email) document.getElementById('emailPrompt').style.visibility = 'visible';
        if (!user.password) document.getElementById('passwordPrompt').style.visibility = 'visible';
        if (!user.username) document.getElementById('usernamePrompt').style.visibility = 'visible';
        if (!user.number) document.getElementById('numberPrompt').style.visibility = 'visible';
        if (confirmPasssword !== user.password) document.getElementById('confirmPassswordPrompt').style.visibility = 'visible'
        else {
            const body = JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                number: user.number,
                refer: user.refer,
            })
            axios.post(`${import.meta.env.VITE_BASE_URL}/`, body, {
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => {
                if (!res.data.success) {
                    if (res.data.field === 'email') {
                        dispatch({
                            type: 'SET_ALERT',
                            payload: 'Email already registered!',
                            success: 'false'
                        })
                    }
                    else if (res.data.field === 'username') {
                        dispatch({
                            type: 'SET_ALERT',
                            payload: 'Please Choose another Username',
                            success: 'false'
                        })
                    }
                }
                else {
                    dispatch({
                        type: 'SET_ALERT',
                        payload: 'Successfully Registered! Please check Email to verify',
                        success: 'true'
                    })
                    navigate('/login')
                }
            })
                .catch(err => console.log(err))

        }
    }
    return (
        <div className='container mt-4 px-5 py-3' style={{ width: '40%', borderRadius: '10px', background: '#1e1e1e', color: 'white' }}>
            <h3 className='d-flex justify-content-center align-item-center'>Register</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input autoComplete="off" type="email" className="form-control" id="email" name='email' value={user.email} onChange={onChange} style={{ borderRadius: '50px' }} />
                    <div id="emailPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Email Required *</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input autoComplete="off" type="password" className="form-control" id="password" name='password' value={user.password} onChange={onChange} style={{ borderRadius: '50px' }} />
                    <div id="passwordPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Password Required *</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input autoComplete="off" type="password" className="form-control" id="confirmPassword" value={confirmPasssword} name='confirmPasssword' onChange={(e) => setConfirmPassword(e.target.value)} style={{ borderRadius: '50px' }} />
                    <div id="confirmPassswordPrompt" className="form-text ms-3" style={{ color: "red", visibility: 'hidden' }}>Password Not Match *</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
                    <input autoComplete="off" type="text" className="form-control" id="username" name='username' value={user.username} onChange={onChange} style={{ borderRadius: '50px' }} />
                    <div id="usernamePrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Username Required *</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                    <input autoComplete="off" type="text" className="form-control" id="number" name='number' value={user.number} onChange={onChange} style={{ borderRadius: '50px' }} />
                    <div id="numberPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Number Required *</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Referral Code (optional)</label>
                    <input autoComplete="off" type="text" className="form-control" id="refer" name='refer' value={user.refer} onChange={onChange} style={{ borderRadius: '50px' }} />
                    <div id="emailHelp" className="form-text">You'll get 20 Referral points by using a Referral Code</div>
                </div>
                <div className='d-grid gap-2 col-6 mx-auto my-3'>
                    <button type="submit" className="btn btn-outline-danger" style={{ borderRadius: '50px' }}>Register</button>
                </div>
            </form>
        </div>
    )
}
