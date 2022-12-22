import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Nav, Navbar, Container, Dropdown, Spinner, ToastContainer, Toast } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/Context"
import ModalSaldo from "../Profile/ModalSaldo"
import ModalConfirmLogout from "./ModalConfirmLogout"

const NavigationBar = () => {

    const { userID } = useContext(UserContext)
    const { showFloatingAlert, setShowFloatingAlert } = useContext(UserContext)
    const { userSaldo, setUserSaldo } = useContext(UserContext)
    const [modalShow, setModalShow] = useState(false)
    const [userProfilePicture, setUserProfilePicture] = useState("")
    const [fullName, setfullName] = useState("")
    const [showAlertIfArtikelDeleted, setShowAlertIfArtikelDeleted] = useState(true)
    const [profileData, setProfileData] = useState(JSON.parse(window.localStorage.getItem('data')))
    const [modalShowSaldo, setModalShowSaldo] = useState(false)
    const navigateTo = useNavigate()

    const titleNama = () => {
        const apiURL = `http://127.0.0.1:8000/profile/${profileData}`
        axios.get(apiURL).then((response) => {
            if (response.data !== null) {
                setUserProfilePicture(response.data.profilPhoto)
                setfullName(response.data.fullname)
            }
        })
    }

    const onClickProfile = () => {
        navigateTo('/Profile')
    }

    const onClickLogo = () => {
        navigateTo('/Home')
    }

    useEffect(() => {
        const loadTitleNama = () => {
            titleNama()
        }
        loadTitleNama()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setProfileData(JSON.parse(window.localStorage.getItem('data')))
    }, [])

    useEffect(() => {
        const mySaldo = () => {
            const apiURL = `http://127.0.0.1:8000/saldo/?userID=${userID}`
            axios.get(apiURL).then((response) => {
                if(response.data !== null){
                    setUserSaldo(response.data.saldo)
                }
            }).catch((err) => {
                alert (`Server tidak merespon...==> ${err.message} `)
            })
        }
        mySaldo()
        // eslint-disable-next-line
    }, [userID])

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="" variant="light" sticky="top" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderBottom: "solid 1px white", backdropFilter: "blur(20px)" }}>
                <Container>
                    <Navbar.Brand>
                        <span onClick={() => { onClickLogo() }}>
                            <b className="my-ticket"> <i className="bi bi-ticket-detailed-fill"></i> MyTicket</b>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link style={{ color: "black" }} to="/Home" className="nav-link"> <span> <i className="bi bi-house-fill"></i> Home </span> </Link>
                            <Link style={{ color: "black" }} to="/Ticket" className="nav-link"> <span><i className="bi bi-ticket-detailed-fill"></i> Tiket</span></Link>
                            <Link style={{ color: "black" }} to="/Profile" className="nav-link"> <span><i className="bi bi-person-fill"></i> Profile</span></Link>
                            {/* <Link style={{ color: "white" }} to="/About" className="nav-link">About</Link> */}
                        </Nav>
                        <Nav>
                            <div className="saldo-saya">
                                <span className="saldo-saya-content text-dark" onClick={() => {setModalShowSaldo(true)}}><i className="bi bi-wallet2"> </i> <span className="txt-saldo-saya" > Rp.{userSaldo}</span></span>
                            </div>
                            <Dropdown >
                                <div className="dropdown-toggle-container">
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        {
                                            (userProfilePicture)
                                                ?
                                                <img
                                                    src={userProfilePicture}
                                                    style={{ objectFit: "cover", backgroundColor: "black", height: "35px", width: "35px", borderRadius: "100%", cursor: "pointer", border: "solid 2px grey", marginRight: "10px" }} alt=" " />
                                                :
                                                <Spinner animation="border" variant="primary" />
                                        }
                                        <span className="username-on-navbar">
                                            {
                                                fullName
                                            }
                                        </span>
                                    </Dropdown.Toggle>
                                </div>
                                <Dropdown.Menu style={{ padding: "0px 2px 2px 2px" }} className='scaled-transition shadow-prev-container'>
                                    <Dropdown.Item onClick={() => { onClickProfile() }}> <i className="bi bi-person-fill"></i> Profile </Dropdown.Item>
                                    <Dropdown.Item style={{ backgroundColor: "rgb(220, 53, 69)", color: "white", borderRadius: "5px" }} onClick={() => { setModalShow(true) }}> <i className="bi bi-box-arrow-left"></i> Logout </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                {
                    (showFloatingAlert === true)
                    &&
                    <ToastContainer position="top-end" className="p-3 mt-5" >
                        <Toast onClose={() => {
                            setShowAlertIfArtikelDeleted(false)
                            setShowFloatingAlert(false)
                        }} show={showAlertIfArtikelDeleted} bg="success" style={{ margin: "10px" }} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Pemberitahuan</strong>
                                <small className="text-muted">just now</small>
                            </Toast.Header>
                            <Toast.Body style={{ color: "white" }} >Artikel berhasil di hapus ...!!</Toast.Body>
                        </Toast>
                    </ToastContainer>
                }
            </Navbar>
            <ModalConfirmLogout
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ModalSaldo
                show={modalShowSaldo}
                onHide={() => setModalShowSaldo(false)} />

        </>
    );
};

export default NavigationBar;