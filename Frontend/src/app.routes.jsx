import {createBrowserRouter} from "react-router"
import Login from "./featues/auth/pages/Login"
import Register from "./featues/auth/pages/Register"


export const router = createBrowserRouter([
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    }
])