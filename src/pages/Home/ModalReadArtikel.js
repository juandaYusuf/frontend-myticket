import React from 'react'
import { Button, Container, Modal } from 'react-bootstrap';

const ModalReadArtikel = (props) => {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                fullscreen={true}>
                <Modal.Body>
                    <Container>
                        <div className='d-flex justify-content-center'>
                            <h1>
                                {props.title}
                            </h1>
                        </div>
                        <img src={props.thumbnail} className='thumbnail-artikel shadow-prev-container' alt='Gambar tidak tersedia' />
                        <p>
                            {props.content}
                        </p>
                        <i className="bi bi-person-fill text-secondary"> Author: <cite title="Source Title">{props.author}</cite> </i>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container className='d-flex justify-content-between'>
                        <i className="bi bi-chat text-success" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                        <i className="bi bi-heart text-danger" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                        <i className="bi bi-heart-fill text-danger" style={{ overflow: "hidden", cursor: "pointer" }}></i>

                        <i className="bi bi-send-fill text-primary" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                        <Button variant='outline-danger' onClick={props.onHide}>Close</Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalReadArtikel