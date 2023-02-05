import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import UserContext from '../../context/Context'
import { apiURL } from '../../Api'

const EditComment = (props) => {

    const { userID } = useContext(UserContext)
    const [profilePhotoAuthor, setProfilePhotoAuthor] = useState("")
    const [inputEditComment, setInputEditComment] = useState(props.comment_content_for_edit)

    const editComment = () => {
        const data = {
            "id": props.comment_id,
            "user_id": userID,
            "artikels_id":  props.artikel_id,
            "content": inputEditComment
        }
        axios.put(apiURL().EDIT_PUBLIC_COMMENT, data).then(() => {
            props.close_edit_comment()
        })
    }

    useEffect(() => {
        // Get profile foto
        axios.get(apiURL(userID).PROFILE_USER_DATA).then((response) => {
            setProfilePhotoAuthor(response.data.profilPhoto)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <section className='p-3'>
                <strong>Edit Komentar</strong>
                <div className='p-3 d-flex align-items-start'>
                    <img src={profilePhotoAuthor} style={{ height: "40px", width: "40px", borderRadius: "100%", marginRight: "10px", backgroundColor: "grey", objectFit: "cover" }} alt='x' />
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit komentar..."
                            aria-label="Edit komentar..."
                            aria-describedby="basic-addon2"
                            value={inputEditComment}
                            onChange={(e) => {setInputEditComment(e.target.value)}}
                        />
                        <Button variant="outline-success bi bi-arrow-clockwise" onClick={() => {editComment()}}> Update</Button>
                        <Button variant="outline-danger bi bi-slash-circle" onClick={() => { props.edited() }}> Batal</Button>
                    </InputGroup>
                </div>
            </section>
        </>
    )
}

export default EditComment