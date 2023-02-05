import React, { useContext, useEffect, useState } from 'react'
import { Card, Collapse, Dropdown, Placeholder } from 'react-bootstrap'
import axios from 'axios'
import UserContext from '../../context/Context'
import ModalUpdateArtikel from './ModalUpdateArtikel'
import EmptyPage from '../EmptyPage'
import ModalDeleteArtikel from './ModalDeleteArtikel'
import { apiURL } from '../../Api'

const ArtikelCollections = () => {
    const { userID } = useContext(UserContext)
    const { setShowFloatingAlert, setRefreshArtikelCollections } = useContext(UserContext)
    const { refreshArtikelCollections } = useContext(UserContext)
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [open, setOpen] = useState(false)
    const [hideBorderBottom, setHideBorderBottom] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [myArtikel, setMyArtikel] = useState([])
    const [author, setAuthor] = useState("")
    const [artikelID, setArtikelID] = useState("")
    const [userIDOfArtikel, setUserIDOfArtikel] = useState("")
    const [artikelTitle, setArtikelTitle] = useState("")
    const [artikelContent, setArtikelContent] = useState("")
    const [openImageArtikel, setOpenImageArtikel] = useState("")
    const [showThumnail, setShowThumnail] = useState("thumbnail")
    const [isArtikelReady, setIsArtikelReady] = useState(false);
    const fromWhere = "artikelCollections"


    const hideBorderBottomArtikelBaru = () => {
        if (open === false) {
            setHideBorderBottom("solid 1px grey")
        } else {
            setHideBorderBottom("")
        }
    }

    const getMyArtikel = () => {
        axios.get(apiURL(userID).MY_ARTIKEL).then((response) => {
            if (!response.data) {
                setIsLoading(true)
            } else {
                setMyArtikel(response.data)
                setIsLoading(false)
                if (response.data.length !== 0) {
                    setIsArtikelReady(true)
                }
            }
        })
    }

    const CloseModalWhenArtikelUpdated = () => {
        setModalShow(false)
        getMyArtikel()
    }

    const authorOfArtikel = () => {
        axios.get(apiURL(userID).PROFILE_USER_DATA).then((response) => {
            if (!response.data) {
                setIsLoading(true)
            } else {
                setAuthor(response.data.fullname)
            }
        })
    }

    const deleteArtikel = () => {
        const data = {
            id: artikelID,
            user_id: userIDOfArtikel
        }
        axios.delete(apiURL(artikelID, userIDOfArtikel).DELETE_ARTIKEL, data).then((response) => {
            if (response) {
                getMyArtikel()
                setShowFloatingAlert(true)
                setOpen(false)
                setIsArtikelReady(false)
                setShowModalDelete(false)
            }
        })
    }

    useEffect(() => {
        getMyArtikel()
        if (refreshArtikelCollections === true) {
            setRefreshArtikelCollections(false)
            // eslint-disable-next-line
        }
        // eslint-disable-next-line
    }, [refreshArtikelCollections]);

    useEffect(() => {
        getMyArtikel()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        authorOfArtikel()
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div style={{ border: "solid 1px grey", borderRadius: "10px", overflow: "hidden" }} className="scaled-transition shadow-prev-container">
                <div
                    onClick={() => {
                        setOpen(!open)
                        hideBorderBottomArtikelBaru()
                    }}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    style={{ backgroundColor: "salmon", color: "black", width: "100%", cursor: "pointer", borderBottom: `${hideBorderBottom}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                        <span style={{ margin: "10px" }}>Koleksi artikel saya</span>
                        <span style={{ margin: "10px" }}>🔖</span>
                    </div>
                </div>
                <Collapse in={open}>
                    <div>
                        {
                            (isArtikelReady === false)
                                ?
                                <EmptyPage fromwhere={fromWhere} />
                                :
                                <div id="example-collapse-text">
                                    {
                                        (isLoading)
                                            ?
                                            <Card className='scaled-transition'>
                                                <Card.Header>
                                                    <Placeholder as="p" animation="wave">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Placeholder as="p" animation="wave">
                                                        <Placeholder className="w-75" /><Placeholder className="w-75" /><Placeholder className="w-75" />
                                                        <Placeholder style={{ width: '25%' }} />
                                                        <Placeholder style={{ width: '15%' }} />
                                                    </Placeholder>
                                                </Card.Body>
                                            </Card>
                                            :
                                            myArtikel.map((result) => {
                                                return <div className='scaled-transition' key={result.id.toString()} >
                                                    <Card style={{ margin: "10px" }}>
                                                        <Card.Header>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                                                                <h4>{result.title}</h4>
                                                                <Dropdown onClick={() => {
                                                                    setArtikelID(result.id)
                                                                    setUserIDOfArtikel(result.user_id)
                                                                    setArtikelTitle(result.title)
                                                                    setArtikelContent(result.isi)
                                                                }}>
                                                                    <Dropdown.Toggle variant=""/>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => {
                                                                            setModalShow(true)
                                                                            setShowThumnail("")
                                                                        }}>✏️ Edit</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => {
                                                                            setShowModalDelete(true)
                                                                            // deleteArtikel()
                                                                        }}>❌ Hapus</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <blockquote className="blockquote mb-0">
                                                                <div>
                                                                    <div style={{ marginRight: "10px" }} >
                                                                        <img src={result.thumbnail} onClick={() => {
                                                                            setModalShow(true)
                                                                            setOpenImageArtikel(result.thumbnail)
                                                                            setShowThumnail("thumbnail")
                                                                        }} className='thumbnail-artikel shadow-prev-container' alt='Gambar tidak tersedia'/>
                                                                    </div>
                                                                    <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                                                        {result.isi}
                                                                    </p>
                                                                </div>
                                                                <hr />
                                                                <footer className="blockquote-footer">
                                                                    Created By: <cite title="Source Title">{author}</cite>
                                                                </footer>
                                                            </blockquote>
                                                        </Card.Body>
                                                    </Card>
                                                    <br />
                                                </div>
                                            })
                                    }
                                </div>
                        }
                    </div>
                </Collapse>

            </div>
            <ModalUpdateArtikel
                artikelid={artikelID}
                useridofartikel={userIDOfArtikel}
                closewhenartikelupdate={CloseModalWhenArtikelUpdated}
                artikeltitle={artikelTitle}
                artikelcontent={artikelContent}
                thumbnail={openImageArtikel}
                isshowthumbnail={showThumnail}
                show={modalShow}
                onHide={() => setModalShow(false)} />

            <ModalDeleteArtikel
                show={showModalDelete}
                delete={() => deleteArtikel()}
                onHide={() => setShowModalDelete(false)}
            />
        </>
    )
}

export default ArtikelCollections