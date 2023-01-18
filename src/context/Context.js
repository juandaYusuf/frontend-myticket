import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [userID, setUserID] = useState(0)
    const [userSaldo, setUserSaldo] = useState(0)
    const [showFloatingAlert, setShowFloatingAlert] = useState(false)
    const [refreshArtikelCollections, setRefreshArtikelCollections] = useState(false)
    const [profilePictureUpdater, setprofilePictureUpdater] = useState("")
    const [modalUpload, setModalUpload] = useState(false)
    const [refreshFullName, setRefreshFullName] = useState("")
    const [RefreshEmail, setRefreshEmail] = useState("")
    const [RefreshNoTelepon, setRefreshNoTelepon] = useState("")

    useEffect(() => {
        setUserID(JSON.parse(window.localStorage.getItem('data')))

        // eslint-disable-next-line
    }, [])



    return (
        <UserContext.Provider value={{
            userID,
            setUserID,
            showFloatingAlert,
            setShowFloatingAlert,
            refreshArtikelCollections,
            setRefreshArtikelCollections,
            userSaldo,
            setUserSaldo,
            profilePictureUpdater,
            setprofilePictureUpdater,
            modalUpload,
            setModalUpload,
            refreshFullName,
            setRefreshFullName,
            RefreshEmail,
            setRefreshEmail,
            RefreshNoTelepon, 
            setRefreshNoTelepon
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
// *====================================