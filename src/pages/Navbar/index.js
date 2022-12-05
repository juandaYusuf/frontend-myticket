import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Nav, Navbar, Container, Dropdown, Spinner, ToastContainer, Toast } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/Context"
import ModalConfirmLogout from "./ModalConfirmLogout"

const NavigationBar = () => {

    const { showFloatingAlert, setShowFloatingAlert } = useContext(UserContext)
    const [modalShow, setModalShow] = useState(false)
    const [userProfilePicture, setUserProfilePicture] = useState("")
    const [fullName, setfullName] = useState("")
    const [showAlertIfArtikelDeleted, setShowAlertIfArtikelDeleted] = useState(true)
    const [profileData, setProfileData] = useState(0)
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

    const logOut = () => {
        window.localStorage.clear()
        navigateTo('/SignInUp')
    }

    const onClickLogo = () => {
        navigateTo('/Home')
    }

    useEffect(() => {
        titleNama()
        setProfileData(JSON.parse(window.localStorage.getItem('data')))
    }, [titleNama]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="" variant="dark" sticky="top" style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(0, 0, 0, 0.450)", transitionDuration: "500ms", borderBottom: "solid 1px grey" }}>
                <Container>
                    <Navbar.Brand>
                        <span onClick={() => { onClickLogo() }}>
                            <b className="my-ticket">MyTicket</b>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link style={{ color: "white" }} to="/Home" className="nav-link">Home</Link>
                            <Link style={{ color: "white" }} to="/Ticket" className="nav-link">Tiket</Link>
                            <Link style={{ color: "white" }} to="/Profile" className="nav-link">Profile</Link>
                            {/* <Link style={{ color: "white" }} to="/About" className="nav-link">About</Link> */}
                        </Nav>
                        <Nav>
                            <Dropdown >
                                <Dropdown.Toggle style={{ padding: "3px", paddingRight: "10px", color: "black", borderRadius: "100px" }} variant="light" id="dropdown-basic">
                                    {
                                        (userProfilePicture)
                                            ?
                                            <img
                                                src={userProfilePicture}
                                                style={{ objectFit: "cover", backgroundColor: "grey", height: "35px", width: "35px", borderRadius: "100%", cursor: "pointer", border: "solid 1px grey", marginRight: "10px" }} />
                                            :
                                            <Spinner animation="border" variant="primary" />
                                    }
                                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "10px" }}>
                                        {
                                            fullName
                                        }
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ padding: "0px 2px 2px 2px" }} className='scaled-transition shadow-prev-container'>
                                    <Dropdown.Item onClick={() => { onClickProfile() }}> Profile </Dropdown.Item>
                                    <Dropdown.Item style={{ backgroundColor: "rgb(220, 53, 69)", color: "white", borderRadius: "5px" }} onClick={() => {setModalShow(true)}}>Logout </Dropdown.Item>
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
        </>
    );
};

export default NavigationBar;