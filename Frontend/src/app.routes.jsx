import {createBrowserRouter} from "react-router"
import Login from "./featues/auth/pages/Login"
import Register from "./featues/auth/pages/Register"
import Protected from "./featues/auth/components/Protected"


export const router = createBrowserRouter([
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path : "/",
        element : <Protected><h1>Home Page</h1></Protected>
    }
])