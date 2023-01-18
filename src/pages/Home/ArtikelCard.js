import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Container } from "react-bootstrap"
import ModalReadArtikel from './ModalReadArtikel'

const ArtikelCard = (props) => {

    const [author, setAuthor] = useState('')
    const [show, setShow] = useState(false)




    // Read Artikel
    const readArtikel = () => {
        setShow(true)
    }

    useEffect(() => {
        const getAuthor = () => {
            axios.get(`http://127.0.0.1:8000/profile/${props.useridofartikel}`).then((response) => {
                setAuthor(response.data.fullname)
            })
        }

        getAuthor()
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div className='scaleup-while-hover scaled-transition'>
                <Card className="shadow-prev-container">
                    <Card.Img variant="top" src={props.thumbnail} style={{ width: "286px", height: "180px", backgroundColor: "grey", cursor: "pointer" }} onClick={() => { readArtikel() }}/>
                    <Card.Body>
                        <Card.Title className='artikel-title' style={{ overflow: "hidden", cursor: "pointer", fontWeight: "bolder" }} onClick={() => { readArtikel() }}>{props.title}</Card.Title>
                        <Card.Text className='artikel-content' style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { readArtikel() }}>
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
                            <i className="bi bi-heart text-danger" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                            <i className="bi bi-heart-fill text-danger" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                            <i className="bi bi-chat text-success" style={{ overflow: "hidden", cursor: "pointer" }} onClick={props.comment}></i>
                            <i className="bi bi-send-fill text-primary" style={{ overflow: "hidden", cursor: "pointer" }}></i>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
            <ModalReadArtikel
                title={props.title}
                content={props.content}
                thumbnail={props.thumbnail}
                author={author}
                show={show}
                onHide={() => setShow(false)}
            />
        </>
    )
}

export default ArtikelCard