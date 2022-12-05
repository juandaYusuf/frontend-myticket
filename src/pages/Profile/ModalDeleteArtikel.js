import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalDeleteArtikel = (props) => {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            style={{backdropFilter: "blur(30px)"}}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Hapus Artikel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Apakah anda yakin menghapus artikel ini...?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={props.onHide}>Batal</Button>
                <Button variant='danger' onClick={props.delete}>Hapus</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteArtikel