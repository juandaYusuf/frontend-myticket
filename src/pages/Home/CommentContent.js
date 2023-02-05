import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import UserContext from '../../context/Context'
import DeleteComment from './ModalDeleteComment'
import { apiURL } from '../../Api'


const CommentContent = (props) => {

    const { userID } = useContext(UserContext)
    const [modalDeleteComment, setModalDeleteComment] = useState(false)
    const [author, setAuthor] = useState("")
    const [profilePhotoAuthor, setProfilePhotoAuthor] = useState("")

    const updateComennt = () => {
        props.editcomment()
        props.comment_content_for_edit()
        props.comment_id()
    }

    const refreshCommentList = () => {
        props.refresh_comment_list()
    }


    useEffect(() => {
        //  Menampilkan nama dan photo pengirim "siapa yang ber-KOMENTAR"
        axios.get(apiURL(props.user_id).PROFILE_USER_DATA).then((response) => {
            setAuthor(response.data.fullname)
            setProfilePhotoAuthor(response.data.profilPhoto)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <section>
                <div className='p-3'>
                    <div className='d-flex'>
                        <img src={profilePhotoAuthor} style={{ height: "40px", width: "40px", borderRadius: "100%", marginRight: "10px", backgroundColor: "grey", objectFit: "cover" }} alt=' ' />
                        <Card className='w-100 p-3 mb-2 '>
                            <div className='d-flex justify-content-between w-100 mb-2'>
                                <strong>{author}</strong>
                                {
                                    (userID === props.user_id)
                                    &&
                                    <Dropdown>
                                        <Dropdown.Toggle role="button" as="span" id="dropdown-basic" bsPrefix="bi bi-three-dots" />
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item className='bi bi-pencil-fill' onClick={() => updateComennt()}> Edit</Dropdown.Item>
                                            <Dropdown.Item className='bi bi-trash-fill' onClick={() => setModalDeleteComment(true)}> Hapus</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                            </div>
                            <p>{props.content}</p>
                            {/* <div className='d-flex justify-content-end'>
                                <i className='text-secondary fw-light' style={{ fontSize: "0.85rem" }}>20-01-2023</i>
                            </div> */}
                        </Card>
                    </div>
                </div>
            </section>
            <DeleteComment
                comment_id={props.id}
                show={modalDeleteComment}
                refresh={() => refreshCommentList()}
                onHide={() => setModalDeleteComment(false)} />
        </>
    )
}

export default CommentContent