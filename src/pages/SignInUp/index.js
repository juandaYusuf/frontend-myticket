import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const SignInUp = () => {

    const [IsRegister, setIsRegister] = useState(false);
    const [CardHeader, setCardHeader] = useState("Login");
    const [ButtonLabel, setButtonLabel] = useState("Daftar");
    const [CssClassForRegisterCard, setCssClassForRegisterCard] = useState("card-container");

    const showRegister = () => {
        if (IsRegister === false) {
            setIsRegister(true)
            setCardHeader("Register")
            setButtonLabel("Login")
            setCssClassForRegisterCard("card-container-for-register")
        } else {
            setIsRegister(false)
            setCardHeader("Login")
            setButtonLabel("Daftar")
            setCssClassForRegisterCard("card-container")
        }
    }

    return (
            <div className={CssClassForRegisterCard}>
                <div className='tagline-card scale-up-ver-center'>
                    <h1>Selamat datang di <br /><b>MyTicket</b></h1>
                    <p>Permudah hidup anda dengan memesan tiket dimana saja</p>
                </div>
                <div className='sign-form scale-up-ver-center'>
                    <Card style={{ paddingBottom: "10px" }}>
                        <Card.Header><b>{CardHeader}</b></Card.Header>
                        {
                            (IsRegister === false)
                                ?
                                <LoginComponent />
                                :
                                <RegisterComponent />
                        }
                        <Button style={{ margin: "0px 10px 10px 10px" }} onClick={() => showRegister()} >{ButtonLabel}</Button>
                    </Card>
                </div>
            </div>
    );
}

export default SignInUp;