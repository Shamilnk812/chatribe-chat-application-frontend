import { Navigate, Outlet } from "react-router-dom"

const UserLogingAuth = ()=> {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default UserLogingAuth;