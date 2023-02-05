import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import UserContext from "../../context/Context"
import { apiURL } from '../../Api'

const ArtikelCard = (props) => {

    const navigateTo = useNavigate()
    const [author, setAuthor] = useState("")
    const { userID } = useContext(UserContext)
    const [isThisUserLikeItTheArtikel, setIsThisUserLikeItTheArtikel] = useState("")
    const [totalLike, setTotalLike] = useState(0)
    const [isThisUserCommentItTheArtikel, setIsThisUserCommentItTheArtikel] = useState("")
    const [totalCommentArtikel, setTotalCommentArtikel] = useState(0)


    const showCommentPage = () => {
        props.comment()
        props.artikelid()
        props.user_id_of_artikel_selected()
    }

    // sukai artikel
    const likeTheArtikel = () => {
        axios.post(apiURL(userID, props.id).LIKE_THE_ARTIKEL).then((response) => {
            setIsThisUserLikeItTheArtikel(response.data.deskripsi)
            showTotalLikePerArtikel()
        })
    }

    // menampilkan jumlah like per-artikel
    const showTotalLikePerArtikel = () => {
        axios.get(apiURL(props.id).TOTAL_LIKE_A_ARTIKEL).then((response) => {
            setTotalLike(response.data)
        })
    }

    useEffect(() => {
        // Menampilkan author pada component readArtikel(ModalReadArtikel)
        const getAuthor = () => {
            axios.get(apiURL(props.useridofartikel).PROFILE_USER_DATA).then((response) => {
                setAuthor(response.data.fullname)
            })
        }

        // Menampilkan artikel yang disukai berdasarkan user yang login, atau menampilkan artikel yang disukai user
        // atau menampilkan apakah user nglike pada salahsatu artikel
        const showWhoLikeOfArtikelsByUser = () => {
            axios.get(apiURL(userID, props.id).LIKE_OF_ARTIKEL_BY_USER).then((response) => {
                if (response.data === "this user likes it yet") {
                    setIsThisUserLikeItTheArtikel(response.data)
                } else {
                    setIsThisUserLikeItTheArtikel(response.data.deskripsi)
                }
            })
        }

        // Menampilkan artikel yang mengomentari berdasarkan user yang login, atau menampilkan artikel yang disukai user
        // atau menampilkan apakah user berkomentar pada salahsatu artikel
        const showWhoCommentOfArtikelsByUser = () => {
            axios.get(apiURL(userID, props.id).COMMENT_ARTIKEL_BY_USER).then((response) => {
                if(response.data === "this user comment it yet"){
                    setIsThisUserCommentItTheArtikel(response.data)
                }else{
                    setIsThisUserCommentItTheArtikel(response.data.user_id)
                }
            })
        }

        if (!isThisUserLikeItTheArtikel) {
            showWhoLikeOfArtikelsByUser()
            showTotalLikePerArtikel()
        }

        getAuthor()
        showWhoCommentOfArtikelsByUser()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const showTotalCommentPerArtikel = () => {
            axios.get(apiURL(props.id).TOTAL_COMMENT_A_ARTIKEL).then((response) => {
                setTotalCommentArtikel(response.data)
            })
        }
        showTotalCommentPerArtikel()
        return () => {
            showTotalCommentPerArtikel()
        }
    }, [props.id])

    return (
        <>
            <div className='scaleup-while-hover scaled-transition'>
                <Card className="shadow-prev-container">
                    <Card.Img variant="top" src={props.thumbnail} style={{ width: "286px", height: "180px", backgroundColor: "grey", cursor: "pointer" }} onClick={() => { showCommentPage() }} />
                    <Card.Body>
                        <Card.Title className='artikel-title' style={{ overflow: "hidden", cursor: "pointer", fontWeight: "bolder" }} onClick={() => { showCommentPage() }}>{props.title}</Card.Title>
                        <Card.Text className='artikel-content' style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { showCommentPage() }}>
                            {
                                (props.content)
                                    ?
                                    props.content
                                    :
                                    " Loading...."
                            }
                        </Card.Text>
                        <br />
                        <footer className="blockquote-footer ellipsis-one-line" >
                            Created By: <cite title="Source Title" >{author}</cite>
                        </footer>
                        <Container className='d-flex gap-3'>
                            {
                                (isThisUserLikeItTheArtikel === "unlike" || isThisUserLikeItTheArtikel === "this user likes it yet" || isThisUserLikeItTheArtikel === "")
                                    ?
                                    <span className="bi bi-heart text-danger" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { likeTheArtikel() }}> {totalLike} </span>
                                    :
                                    <span className="bi bi-heart-fill text-danger" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { likeTheArtikel() }}> {totalLike} </span>
                            }
                            {
                                (isThisUserCommentItTheArtikel === "this user comment it yet" || isThisUserCommentItTheArtikel === "")
                                    ?
                                    <span className="bi bi-chat text-success" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { showCommentPage() }}> {totalCommentArtikel} </span>
                                    :
                                    <span className="bi bi-chat-dots-fill text-success" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { showCommentPage() }}> {totalCommentArtikel} </span>
                            }
                            <span className="bi bi-send-fill text-primary" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { navigateTo('/Chat') }}></span>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ArtikelCard