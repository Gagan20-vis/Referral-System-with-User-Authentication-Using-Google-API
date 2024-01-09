import { useReducer } from "react"
import MyContext from './MyContext'
const initialState = {
    alert: {},
    LoggedIn: localStorage.getItem('LoggedIn') || 'false',
}
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALERT': {
            return {
                ...state,
                alert: {alert: action.payload,success:action.success}
            }
        }
        case 'SET_LOGGEDIN': {
            return {
                ...state,
                LoggedIn: action.payload
            }
        }
        default:
            return state;
    }
}
const MyState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MyContext.Provider value={{ dispatch, alert: state.alert,LoggedIn: state.LoggedIn }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState
