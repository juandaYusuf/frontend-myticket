import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"
import ModalReadArtikel from './ModalReadArtikel'

const ArtikelCard = (props) => {

    const [author, setAuthor] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)

    const getAuthor = () => {
        axios.get(`http://127.0.0.1:8000/profile/${props.useridofartikel}`).then((response) => {
            setAuthor(response.data.fullname)
        })
    }


    // Read Artikel
    const readArtikel = () => {
        setShow(true)
    }





    const isLoadingData = () => {
        if (!props.content) {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        getAuthor()
        isLoadingData()
    }, []);


    return (
        <>
            <div className='scaleup-while-hover'>
                <Card style={{ width: '18rem', overflow: "hidden", cursor: "pointer" }} className="shadow-prev-container" onClick={() => { readArtikel() }}>
                    <Card.Img variant="top" src={props.thumbnail} style={{ width: "286px", height: "180px", backgroundColor: "grey" }} />
                    <Card.Body>
                        <Card.Title className='artikel-title'>{props.title}</Card.Title>
                        <Card.Text>
                            {
                                (props.content)
                                    ?
                                    <p className='artikel-content'>
                                        {props.content}
                                    </p>
                                    :
                                    <p>
                                        Loading....
                                    </p>
                            }
                        </Card.Text>
                        <br />
                        <footer className="blockquote-footer ellipsis-one-line" >
                            Created By: <cite title="Source Title" >{author}</cite>
                        </footer>
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