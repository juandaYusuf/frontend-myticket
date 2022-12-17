import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [localData, setLocalData] = useState(JSON.parse(window.localStorage.getItem('data')));

    useEffect(() => {
        setLocalData(localData)
        // eslint-disable-next-line
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