import React, { useEffect } from 'react';

import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const GetStart = () => {

    const navigate = useNavigate();
    const goToLogin = () => { 
        navigate('/SignInUp') 
    }

    useEffect(() => {
        window.localStorage.clear()
    }, []);

    return (
        <div>
            <div className="parallax layer1">
                <div className="title-layout">
                    <div className='title'>
                        <h1>PILIH MyTicket</h1>
                        <p>GAPAI INPIAN ANDA TANPA HARUS ANTRI</p>
                    </div>
                    <Link
                        className='btn btn-warning'
                        to="the-second"
                        spy={true}
                        smooth={true}
                        duration={100}>
                        <div className='Link-auto-scroll'>
                            Lanjutkan Eksplor
                        </div>
                    </Link>
                </div>
            </div>
            <div className="parallax layer2">
                <div className="title-layout">
                    <div id="the-second" className='title'>
                        <h1>PESAN TIKET</h1>
                        <p>GAK PAKE RIBET HANYA DI MyTicket</p>
                    </div>
                    <Button className='btn btn-danger' onClick={() => goToLogin()} size='lg'>Kunjungi MyTicket</Button>
                </div>
            </div>
        </div>
    )
}

export default GetStart;