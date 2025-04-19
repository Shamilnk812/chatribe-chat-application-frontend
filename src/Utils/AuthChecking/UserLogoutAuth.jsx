import { Navigate, Outlet } from "react-router-dom"

const UserLogoutAuth = ()=>{

    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default UserLogoutAuth