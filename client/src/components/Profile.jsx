import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/MyContext'
import Swal from 'sweetalert2'
export default function Profile() {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState(null);
    const { dispatch } = useContext(MyContext);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/profile`)
            .then(res => {
                if (res.data && res.data.currUser) {
                    setCurrUser(res.data.currUser);
                }
                else navigate('/login')
            })
            .catch(err => console.log(err));
    }, []);
    const DeleteAccount = () => {
        Swal.fire({
            title: "Are you sure ?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteAccount`)
                    .then((res) => {
                        dispatch({
                            type: 'SET_ALERT',
                            payload: 'User Account Deleted Successfully',
                            success: 'true'
                        })
                    })
                    .catch(e => console.log(e))
                axios.defaults.withCredentials = true;
                axios.delete(`${import.meta.env.VITE_BASE_URL}/logout`);
                localStorage.setItem('LoggedIn', 'false');
                dispatch({
                    type: 'SET_LOGGEDIN',
                    payload: 'false'
                })
                navigate('/');
            }
        });
    }
    return (
        currUser && (
            <div className='container my-4 p-4' style={{ border: '1px solid grey', borderRadius: "10px", color: 'white' }}>
                <h4 className='mb-4'>About You</h4>
                <p>Username: <strong>{currUser.username}</strong></p>
                <p>Email: <strong>{currUser.email}</strong></p>
                <p>Phone: <strong>{currUser.number}</strong></p>
                <p>Referral Id: <strong>{currUser.referCode}</strong></p>
                {currUser.referedBy !== "" && (<p>Refered By: <strong>{currUser.referedBy}</strong></p>)}
                <p style={{ marginBottom: "0rem" }}>Referral Link: <strong><a href="#">{currUser.referLink}</a></strong></p>
                <span className="form-text" style={{ color: 'white' }}>You will Get 20 Referral Points Per Refer, And 10 Referral Points Per Second Level Refer Mean's If Your Friend Invites His Friend With His Link You'll Get 10 Points</span>
                <div className="d-flex justify-content-start mt-4">
                    <button className='btn btn-primary me-2'>Change Password</button>
                    <button className='btn btn-primary me-2'>Change Username</button>
                    <button className='btn btn-danger me-2' onClick={DeleteAccount}>Delete Account</button>
                </div>
            </div>
        )
    );
}
