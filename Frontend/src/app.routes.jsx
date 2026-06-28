import {createBrowserRouter} from "react-router"
import Login from "./featues/auth/pages/Login"
import Register from "./featues/auth/pages/Register"
import Protected from "./featues/auth/components/Protected"
import Home from "./featues/interview/pages/Home"
import Interview from "./featues/interview/pages/Interview"
import Landing from "./featues/landing/Landing"


export const router = createBrowserRouter([
    {
        path : "/",
        element : <Landing/>
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path : "/app",
        element : <Protected><Home/></Protected>
    },
    {
        path : "/interview/:interviewId",
        element : <Protected><Interview/></Protected>
    }
])
