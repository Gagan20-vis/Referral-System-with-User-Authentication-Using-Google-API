import { useContext } from "react";
import MyContext from '../context/MyContext';
import Swal from 'sweetalert2'
export default function Alert() {
    const { alert, dispatch } = useContext(MyContext);
    const success = (alert.success==='true') ? "success" : "error";
    setTimeout(() => {
        dispatch({
            type: 'SET_ALERT',
            payload: null
        })
    }, 3000);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    alert.alert && Toast.fire({
        icon: success,
        title: alert.alert
    });
}
