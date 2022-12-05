import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

const ModalConfirmLogout = (props) => {
    
    const navigateTo = useNavigate()

    const logOut = () => {
        window.localStorage.clear()
        navigateTo('/SignInUp')
    }


    return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{backdropFilter: "blur(30px)"}}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin logout...??
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.onHide}>Batal</Button>
                    <Button variant="danger" onClick={logOut}>Logout</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default ModalConfirmLogout