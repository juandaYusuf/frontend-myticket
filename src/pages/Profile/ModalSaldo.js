import React, { useContext } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import UserContext from '../../context/Context'



const ModalSaldo = (props) => {
    const { userSaldo } = useContext(UserContext)
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                style={{ backdropFilter: "blur(30px)" }}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <i className="bi bi-wallet2"></i> Saldo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="info">
                        <h4> <i className="bi bi-info-square-fill"></i> Note...</h4> Anda dapat memperoleh saldo dengan mengklik tombol topup kemudian jawab pertanyaan yang disediakan
                    </Alert>
                    <Alert variant='warning'>
                        <div className='saldo-content'>
                            <h6>Saat ini saldo anda yang tersisa</h6>
                            <span className='nominal-saldo'> <i className="bi bi-cash-stack"></i> <i className="bi bi-arrow-right"></i>  {userSaldo}. </span>
                            <hr />
                            <i className='note-saldo'> <i className="bi bi-journals"></i> Jika saldo anda kurang dari Rp.8000 silahkan lakukan topup</i>
                        </div>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalSaldo