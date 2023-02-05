import React, { useState } from 'react'
import { Dropdown, Navbar } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import ModalConfirmLogout from '../Navbar/ModalConfirmLogout'

const NavbarOfChatList = () => {

    const [modalShow, setModalShow] = useState(false)
    const navigateTo = useNavigate()

    return (
        <>
            <Navbar className='py-0 px-2 ' variant="light" bg="none" sticky='top' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderBottom: "solid 1px white", backdropFilter: "blur(20px)" }} >
                <Navbar.Text className="w-100 text-dark">
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <span className='bi bi-arrow-left-short h2 change-cursor' onClick={() => { navigateTo(-1) }} />
                            <h4>Chat</h4>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle role="button" as="span" id="dropdown-basic" bsPrefix="bi bi-list h4" />
                            <Dropdown.Menu align="end" style={{ padding: "0px 2px 2px 2px" }} className='scaled-transition shadow-prev-container'>
                                <Dropdown.Item onClick={() => { navigateTo('/Profile') }}> <i className="bi bi-person-fill"></i> Profile </Dropdown.Item>
                                <Dropdown.Item style={{ backgroundColor: "rgb(220, 53, 69)", color: "white", borderRadius: "5px" }} onClick={() => { setModalShow(true) }}> <i className="bi bi-box-arrow-left"></i> Logout </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Navbar.Text>
            </Navbar>

            <ModalConfirmLogout
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </>
    )
}

export default NavbarOfChatList