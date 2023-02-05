import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { apiURL } from '../../Api'


const DeleteComment = (props) => {


    const deletePublicComment = () => {
        axios.delete(apiURL(props.comment_id).DELETE_COMMENT_PUBLIC).then((response) => {
            if (response.data === "comment has been deleted") {
                props.onHide()
                props.refresh()
            }
        })
    }

    return (
        <>
            <Modal
                show={props.show} 
                onHide={props.onHide}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                style={{ backdropFilter: "blur(20px)" }}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Hapus komentar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus komentar ini...?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center w-100 gap-2'>
                        <Button variant='success w-100' onClick={props.onHide}>Tidak</Button>
                        <Button variant='danger w-100' onClick={() => { deletePublicComment() }} >Ya</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteComment