import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const ModalReadArtikel = (props) => {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.thumbnail} className='thumbnail-artikel shadow-prev-container' />
                    <p>
                        {
                            props.content
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <footer className="blockquote-footer">
                    Author: <cite title="Source Title">{props.author}</cite>
                    </footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalReadArtikel