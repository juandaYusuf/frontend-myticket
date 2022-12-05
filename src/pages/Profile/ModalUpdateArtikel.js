import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Col, Alert } from 'react-bootstrap'

const ModalUpdateArtikel = (props) => {

    const [judulArtikel, setJudulArtikel] = useState("")
    const [contentArtikel, setContentArtikel] = useState("")
    const [thumbnailArtikel, setThumbnailArtikel] = useState("")
    const [image, setImage] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const [fileTypeHandling, setFileTypeHandling] = useState(true)
    const [changeButtonTheme, setChangeButtonTheme] = useState("primary");
    const [showAlert, setShowAlert] = useState(false);


    const updateArtikel = () => {
        const apiURL = `http://127.0.0.1:8000/update_artikel/${props.artikelid}/${props.useridofartikel}`
        let data = {
            "title": judulArtikel,
            "isi": contentArtikel,
        }
        axios.put(apiURL, data).then((response) => {
            if (response) {
                props.closewhenartikelupdate()
            }
        })
    }


    const handleChangeImagePreview = (e) => {
        let prev = URL.createObjectURL(e.target.files[0])
        let f = e.target.files[0]
        let typeOfFile = e.target.files[0].type
        if (typeOfFile === "image/jpg"
            ||
            typeOfFile === "image/jpeg"
            ||
            typeOfFile === "image/png"
        ) {
            setFileTypeHandling(true)
            setImage(prev)
            setUploadImage(f)
            setChangeButtonTheme("primary")
            setShowAlert(false)
        } else {
            setFileTypeHandling(false)
            e.target.value = ""
            setImage("")
        }
    }


    // !Upload file to BackEnd Storage
    const changeThumbnailPhoto = () => {
        let bodyFormData = new FormData()
        bodyFormData.append("image", uploadImage)
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/image/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            if (response.data) {
                setThumbnailArtikel(response.data.url)
            }
        }).catch((err) => {
            alert(err);
        })
    }


    // !Apply to database artikel
    const updateThumbnailArtikel = () => {
        const apiURL = `http://127.0.0.1:8000/update_thumbnail_artikel/${props.artikelid}/${props.useridofartikel}`
        const data = {
            "thumbnail": thumbnailArtikel
        }
        axios.put(apiURL, data)
            .then((response) => {
                if (response.data) {
                    setChangeButtonTheme("success")
                }
            })
    }

    useEffect(() => {
        if (thumbnailArtikel !== "" && image !== "") {
            updateThumbnailArtikel()
        }
    }, [thumbnailArtikel]);


    useEffect(() => {
        setJudulArtikel(props.artikeltitle)
        setContentArtikel(props.artikelcontent)
    }, [props.artikeltitle, props.artikelcontent]);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                style={
                    {
                        backdropFilter: "blur(20px)",
                    }
                }>
                {
                    (props.isshowthumbnail)
                        ?
                        <div>
                            <Modal.Body style={{ backgroundColor: "black", borderRadius: "7px" }}>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <img src={props.thumbnail} style={{ backgroundColor: "black", borderRadius: "10px" }} />
                                    <br />
                                    <div style={{ color: "white", height: "auto", width: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <span onClick={props.onHide} style={{ cursor: "pointer" }}>
                                            ❌ Close
                                        </span>
                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                        :
                        <span>
                            <Modal.Header closeButton onHide={() => { setImage("") }}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    ✏️ Edit artikel
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>Edit artikel pribadi</h4>
                                <Form.Group className="mb-3 mt-10" controlId="judulArtikel">
                                    <Form.Label>Judul artikel</Form.Label>
                                    <Form.Control type="text" placeholder="masukan judul artikel" value={judulArtikel} onChange={(e) => setJudulArtikel(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="thumbnailArtikel">
                                    <Form.Label>Thumbnail artikel</Form.Label>
                                    <Form.Control type="file" placeholder="masukan judul artikel" onChange={handleChangeImagePreview} />
                                    <div style={{ width: "auto", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div >
                                            {
                                                (image !== "")
                                                &&
                                                <span className="shadow-prev-container" style={{ display: "flex", backgroundColor: "lightgray", flexDirection: "column", width: "350px", padding: "20px", margin: "10px", borderRadius: "10px" }}>
                                                    <img className='shadow-prev-container thumbnail-artikel' src={image} />
                                                    <Button
                                                        className='shadow-prev-container'
                                                        variant={changeButtonTheme}
                                                        style={{ width: "100%" }}
                                                        onClick={() => {
                                                            (changeButtonTheme === "primary")
                                                                ?
                                                                changeThumbnailPhoto()
                                                                :
                                                                setShowAlert(true)
                                                        }}>
                                                        {
                                                            (changeButtonTheme === "success")
                                                                ?
                                                                "Gambar telah diupload ✅"
                                                                :
                                                                "Upload gambar ⬆ "
                                                        }
                                                    </Button>
                                                    <br />
                                                    {
                                                        (showAlert === true)
                                                        &&
                                                        <Alert className='shadow-prev-container' variant='warning'> <b>Gambar tersedia</b> <br />Gambar saat ini sudah di upload</Alert>
                                                    }
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </Form.Group>
                                <br />
                                <Form.Group className="mb-3 mt-10" controlId="kontenArtikel">
                                    <Form.Label>Konten artikel</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Content artikel"
                                        // style={{ height: contentArtikel.length / 2 }}
                                        value={contentArtikel}
                                        onChange={(e) => setContentArtikel(e.target.value)}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => {
                                    updateArtikel()
                                }}>Update</Button>
                            </Modal.Footer>
                        </span>
                }
            </Modal >
        </>
    )
}

export default ModalUpdateArtikel