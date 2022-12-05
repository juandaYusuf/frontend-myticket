import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from "../../context/Context";

const ProtectedRoutes = () => {
    const [localData, setLocalData] = useState(JSON.parse(window.localStorage.getItem('data')));

    useEffect(() => {
        setLocalData(localData)
    }, []);

    return (
        (localData > 0 && localData !== null)
            ?
            <Outlet />
            :
            <Navigate to="/SignInUp/" />
    )
}

export default ProtectedRoutes