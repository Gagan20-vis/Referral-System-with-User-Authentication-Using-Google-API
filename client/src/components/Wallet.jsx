import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Wallet() {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState(null);
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
    return (
        currUser && <div className='container my-4 p-4' style={{ border: '1px solid grey', borderRadius: "10px", color: 'white' }}>
            <h4 className='mb-4'>Balance and Referrals</h4>
            <p>balance: <strong>{currUser.balance} &#8377;</strong></p>
            <p>Active Plan: <strong>Basic Plan</strong></p>
            <p>Referral Points: <strong>{currUser.referPoints}</strong></p>
            <p>Total Referrals: <strong>{currUser.totalRefer}</strong></p>
            <p>Total Second Levels Referrals: <strong>{currUser.totalSecondRefer}</strong></p>
            <button className='btn btn-success me-2'>Withdraw Referral Points</button>
        </div>
    )
}
