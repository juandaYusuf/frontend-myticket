import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form, InputGroup } from 'react-bootstrap'
import UserContext from '../../context/Context'
import CommentContent from './CommentContent'
import EditComment from './EditComment'
import { apiURL } from '../../Api'

const CommentComponent = (props) => {

    const { userID } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [isCommentEditing, setIsCommentEditing] = useState(false)
    const [showPublicCommentArtikels, setShowPublicCommentArtikels] = useState([])
    const [profilePhotoAuthor, setProfilePhotoAuthor] = useState("")
    const [inputCommentContent, setInputCommentContent] = useState("")
    const [commentId, setCommentId] = useState(0)
    const [commentContentForEdit, setCommentContentForEdit] = useState("")
    const [totalLike, setTotalLike] = useState(0)
    const [totalComment, setTotalComment] = useState(0)
    const [isThisUserLikeItTheArtikel, setIsThisUserLikeItTheArtikel] = useState("")
    const [isThisUserCommentItTheArtikel, setIsThisUserCommentItTheArtikel] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [authorPhoto, setAuthorPhoto] = useState("")


    const showCommentPublic = () => {
        axios.get(apiURL(props.artikelid).PUBLIC_COMMENT).then((response) => {
            setShowPublicCommentArtikels(response.data)
        })
    }

    const sendInputCommentContent = () => {
        if (inputCommentContent.length > 0) {
            const data = {
                "user_id": userID,
                "artikels_id": props.artikelid,
                "content": inputCommentContent
            }
            axios.post(apiURL().SEND_COMMENT_PUBLIC, data).then(() => {
                setInputCommentContent("")
                refreshValue()
            })
        }
    }

    // sukai artikel
    const likeTheArtikel = () => {
        axios.post(apiURL(userID, props.artikelid).LIKE_THE_ARTIKEL).then((response) => {
            if (response.data.deskripsi === "like") {
                setIsThisUserLikeItTheArtikel("danger bi-heart-fill w-100")
            } else {
                setIsThisUserLikeItTheArtikel("outline-danger bi bi-heart w-100")
            }
            totalLikeOfCommentComponent()
        })
    }

    // menampilkan jumlah like per-artikel
    const totalLikeOfCommentComponent = () => {
        axios.get(apiURL(props.artikelid).TOTAL_LIKE_A_ARTIKEL).then((response) => {
            setTotalLike(response.data)
        })
    }

    // menampilkan jumlah komentar per-artikel
    const totalCommentOfCommentComponent = () => {
        axios.get(apiURL(props.artikelid).TOTAL_COMMENT_A_ARTIKEL).then((response) => {
            setTotalComment(response.data)
        })
    }


    // Menampilkan artikel yang disukai berdasarkan user yang login, atau menampilkan artikel yang disukai user
    // atau menampilkan apakah user nglike pada salahsatu artikel
    const showWhoLikeOfArtikelsByUser = () => {
        axios.get(apiURL(userID, props.artikelid).LIKE_OF_ARTIKEL_BY_USER).then((response) => {
            if (response.data === "this user likes it yet" || response.data.deskripsi === "unlike") {
                setIsThisUserLikeItTheArtikel("outline-danger bi bi-heart w-100")
            } else {
                setIsThisUserLikeItTheArtikel("danger bi-heart-fill w-100")
            }
        })
    }

    // Menampilkan artikel yang mengomentari berdasarkan user yang login, atau menampilkan artikel yang disukai user
    // atau menampilkan apakah user berkomentar pada salahsatu artikel
    const showWhoCommentOfArtikelsByUser = () => {
        axios.get(apiURL(userID, props.artikelid).COMMENT_ARTIKEL_BY_USER).then((response) => {
            if (response.data.user_id === userID) {
                setIsThisUserCommentItTheArtikel("success bi bi-chat  w-100")
            } else {
                setIsThisUserCommentItTheArtikel("outline-success bi bi-chat  w-100")
            }
        })
    }

    const refreshValue = () => {
        showCommentPublic()
        totalLikeOfCommentComponent()
        totalCommentOfCommentComponent()
        showWhoCommentOfArtikelsByUser()
        showWhoLikeOfArtikelsByUser()
    }

    useEffect(() => {
        // menampilkan detail artikel yang akan di komentari
        const artikelForComment = () => {
            axios.get(apiURL(props.artikelid).ARTIKEL_BECOME_COMMENT).then((response) => {
                setTitle(response.data.title)
                setContent(response.data.isi)
                setThumbnail(response.data.thumbnail)
            })
        }

        refreshValue()
        artikelForComment()
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        showCommentPublic()
        // eslint-disable-next-line
    }, [isCommentEditing])

    useEffect(() => {
        // Menampilkan foto profile pada form input komentar (InputGroup)
        axios.get(apiURL(userID).PROFILE_USER_DATA).then((response) => {
            setProfilePhotoAuthor(response.data.profilPhoto)
        })
        // Menampilkan nama dan foto profile penulis artikel
        axios.get(apiURL(props.user_id_of_artikel_selected).PROFILE_USER_DATA).then((response) => {
            
            setAuthorName(response.data.fullname)
            setAuthorPhoto(response.data.profilPhoto)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Card className='scaled-transition' style={{ width: "100%" }}>
                <Card.Header>
                    <Button variant="outline-secondary" onClick={() => props.comment(false)}>
                        <span className="bi bi-arrow-left-short h4" style={{ fontWeight: "bolder" }} />
                    </Button>
                    <img src={authorPhoto} style={{ height: "40px", width: "40px", borderRadius: "100%", marginRight: "10px", marginLeft: "10px", backgroundColor: "grey", objectFit: "cover" }} alt=' ' />
                    <span className='h6'>{authorName}</span>
                </Card.Header>
                <Card.Body className='p-0'>
                    <Card.Title className='m-3 fw-bold'> <span className='h2 fw-bold'>{title}</span></Card.Title>
                    <div className='border border-secondary' style={{ width: "100%", height: "400px" }}>
                        <img src={thumbnail} style={{ objectFit: "cover", width: "100%", height: "100%", backgroundColor: "grey" }} alt=" " />
                    </div>
                    <Card.Text className='m-3'>
                        {content}
                    </Card.Text>
                    <div className='p-3 border-top'>
                        <Row>
                            <Col>
                                <Button variant={isThisUserLikeItTheArtikel} onClick={() => likeTheArtikel()}> {totalLike} Disukai</Button>
                            </Col>
                            <Col>
                                <Button variant={isThisUserCommentItTheArtikel}> {totalComment} Komentar</Button>
                            </Col>
                        </Row>
                    </div>
                    {
                        (isCommentEditing === false)
                            ?
                            showPublicCommentArtikels.map((result) => {
                                return (
                                    <CommentContent
                                        key={result.id}
                                        id={result.id}
                                        comment_id={() => setCommentId(result.id)}
                                        editcomment={() => setIsCommentEditing(true)}
                                        content={result.content}
                                        user_id={result.user_id}
                                        artikel_id={result.artikels_id}
                                        comment_content_for_edit={() => setCommentContentForEdit(result.content)}
                                        refresh_comment_list={() => refreshValue()}
                                    />
                                )
                            })
                            :
                            <EditComment
                                edited={() => setIsCommentEditing(false)}
                                artikel_id={props.artikelid}
                                comment_id={commentId}
                                comment_content_for_edit={commentContentForEdit}
                                close_edit_comment={() => setIsCommentEditing(false)} />
                    }
                </Card.Body>
                {
                    (!isCommentEditing)
                    &&
                    <div className='p-3 d-flex align-items-start'>
                        <img src={profilePhotoAuthor} style={{ height: "40px", width: "40px", borderRadius: "100%", marginRight: "10px", backgroundColor: "grey", objectFit: "cover" }} alt=' ' />
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Tulis komentar..."
                                aria-label="Tulis komentar..."
                                aria-describedby="basic-addon2"
                                value={inputCommentContent}
                                onChange={(e) => { setInputCommentContent(e.target.value) }} />
                            <Button variant="outline-primary bi bi-send" onClick={() => { sendInputCommentContent() }}> Kirim</Button>
                        </InputGroup>
                    </div>

                }
            </Card>
        </>
    )
}

export default CommentComponent