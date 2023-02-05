import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Alert, FloatingLabel } from "react-bootstrap"
import UserContext from '../../context/Context';
import { useNavigate } from 'react-router-dom'
import { apiURL } from '../../Api';

const LoginComponent = () => {

    //* statemanagement data user
    const { userID, setUserID } = useContext(UserContext);

    //* get value dari login component
    const [getEmail, setEmail] = useState("");
    const [getPwd, setPwd] = useState("");
    const [showAlert, setShowAlert] = useState("sukses");

    //* Navigator
    const navigateTo = useNavigate();

    //* request data ke API
    const login = async () => {
        const userData = {
            "email": getEmail,
            "password": getPwd,
        }
        await axios.post(apiURL().LOGIN, userData).then((response) => {
            if (response.data !== null) {
                setUserID(response.data.id)
            } else {
                setShowAlert("gagal")
            }
        })
    }

    //? check form dan data invalid
    const dataChecker = () => {
        if (getEmail === "" || getPwd === "") {
            setShowAlert("gagal")
            setEmail("")
            setPwd("")
        } else {
            login()
        }
    }

    const handleKeyPressLogin = (e) => {
        if (e.charCode === 13) {
            e.preventDefault()
            login()
        }
    }

    // //? validasi data dari API
    useEffect(() => {
        if (userID > 0) {
            navigateTo('/Home/')
        }
        // eslint-disable-next-line
    }, [userID]);

    //?  save data to localstorage
    useEffect(() => {
        if (userID !== 0) {
            window.localStorage.setItem('data', JSON.stringify(userID))
            if (window.localStorage.getItem('data') === null) {
                window.localStorage.clear()
            }
        }
        // eslint-disable-next-line
    }, [userID]);

    //?  clear localstorage ketika logout
    useEffect(() => {
        setUserID(0)
        window.localStorage.clear()
        // eslint-disable-next-line
    }, []);

    //* Render component
    return (
        <>
            <div className='card-login'>
                {
                    (showAlert === "gagal")
                    &&
                    <span>
                        <Alert variant="danger" className='scale-up-ver-center'>
                            <b>Login gagal!<br /></b>Periksa kembali email dan password anda
                        </Alert>
                        <hr />
                    </span>
                }
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            label="Email">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={getEmail}
                                onKeyPress={handleKeyPressLogin}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                autoComplete='username'
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            // controlId="floatingSelectGr
                            label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={getPwd}
                                onChange={(e) => setPwd(e.target.value)}
                                name="password"
                                onKeyPress={handleKeyPressLogin}
                                autoComplete='current-password'
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Alert variant="warning">
                        Sistem informasi -
                        <Alert.Link href="https://www.unikom.ac.id/"> UNIKOM</Alert.Link> Bandung.
                    </Alert>
                    <div className="d-grid gap-2">
                        <Button variant="success" onClick={() => dataChecker()}>
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default LoginComponent