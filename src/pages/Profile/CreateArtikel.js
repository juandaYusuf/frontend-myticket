import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Collapse, FloatingLabel, Form, Alert } from 'react-bootstrap'
import axios from 'axios'
import UserContext from '../../context/Context'

const CreateArtikel = () => {

    const { userID } = useContext(UserContext)
    const { setRefreshArtikelCollections } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const [hideBorderBottom, setHideBorderBottom] = useState("")
    const [titleArtikel, setTitleArtikel] = useState("")
    const [contentArtikel, setContentArtikel] = useState("")
    const [thumbnailArtikel, setThumbnailArtikel] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const [image, setImage] = useState("")
    const [changeButtonTheme, setChangeButtonTheme] = useState("primary")
    const [showAlert, setShowAlert] = useState(false)
    const [showFormUpload, setshowFormUpload] = useState(false)
    const [imageTypeChecker, setImageTypeChecker] = useState(false)
    const [artikelID, setArtikelID] = useState("")
    const [userIDOfArtikel, setUserIDOfArtikel] = useState("")
    const [changeThemeButtonPostingArtikel, setChangeThemeButtonPostingArtikel] = useState("secondary")
    const [alertIfFormIsEmpty, setAlertIfFormIsEmpty] = useState(false);

    const hideBorderBottomArtikelBaru = () => {
        if (open === false) {
            setHideBorderBottom("solid 1px grey")
        } else {
            setHideBorderBottom("")
        }
    }

    const postNewArtikel = () => {
        const apiURL = `http://127.0.0.1:8000/post_artikel/${userID}`
        const data = {
            user_id: userID,
            title: titleArtikel,
            isi: contentArtikel,
        }
        if (titleArtikel !== "" && contentArtikel !== "") {
            axios.post(apiURL, data).then((response) => {
                if (response) {
                    setshowFormUpload(true)
                    setArtikelID(response.data.id)
                    setUserIDOfArtikel(response.data.user_id)
                }
            })
        } else {
            setAlertIfFormIsEmpty(true)
        }


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
            setImage(prev)
            setUploadImage(f)
            setChangeButtonTheme("primary")
            setShowAlert(false)
            setImageTypeChecker(false)
        } else {
            e.target.value = ""
            setImage("")
            setImageTypeChecker(true)
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
        const apiURL = `http://127.0.0.1:8000/update_thumbnail_artikel/${artikelID}/${userIDOfArtikel}`
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
            setRefreshArtikelCollections(true)
        }
    }, [thumbnailArtikel]);

    useEffect(() => {
        if (titleArtikel !== "" && contentArtikel !== "") {
            setChangeThemeButtonPostingArtikel("success")
        } else {
            setChangeThemeButtonPostingArtikel("secondary")
        }
    }, [titleArtikel, contentArtikel]);

    return (
        <>
            <div style={{ border: "solid 1px grey", borderRadius: "10px", overflow: "hidden" }} className="scaled-transition shadow-prev-container">
                <div
                    as={Col}
                    onClick={() => {
                        setOpen(!open)
                        hideBorderBottomArtikelBaru()
                    }}

                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    style={{ backgroundColor: "grey", color: "black", width: "100%", cursor: "pointer", backgroundColor: "AntiqueWhite", borderBottom: `${hideBorderBottom}` }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                        <span style={{ margin: "10px" }}>Buat artikel baru</span>
                        <span style={{ margin: "10px" }}>📑</span>
                    </div>
                </div>

                <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    {
                        (showFormUpload === true)
                            ?
                            <Collapse in={open} className="scaled-transition">
                                <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                    <br />
                                    <Alert variant='warning'> <b>Artikel berhasil diposting...!</b> <br /> Silahkan upload thumbnail <br /> <i style={{ color: "darkorange" }}>Hanya dapat mengupload gambar yang berekstensi .jpg, .png, dan .jpeg</i> </Alert>
                                    <Form.Label>Thumbnail artikel</Form.Label>
                                    <Form.Control type="file" onChange={handleChangeImagePreview} />
                                    {
                                        (imageTypeChecker === true)
                                        &&
                                        <i style={{ color: "red", marginLeft: "10px" }}>Tipe file atau gambar tidak dapat diproses</i>
                                    }
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
                            </Collapse>
                            :
                            <Collapse in={open} className="scaled-transition">
                                <div id="example-collapse-text">
                                    <div className='profile-form-row'>
                                        <Form.Group as={Col} className="mb-3 mt-10" controlId="formBasicEmail">
                                            <Form.Label>Judul artikel</Form.Label>
                                            <Form.Control type="text" placeholder="masukan judul artikel"
                                                value={titleArtikel}
                                                onChange={(e) => setTitleArtikel(e.target.value)} />
                                        </Form.Group>

                                        <span className='m-2' />
                                    </div>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Konten artikel</Form.Label>
                                        <FloatingLabel controlId="floatingTextarea2" label="Tuliskan isi artikel di sini">
                                            <Form.Control style={{ height: '100px' }}
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                                value={contentArtikel}
                                                onChange={(e) => setContentArtikel(e.target.value)}
                                            />
                                        </FloatingLabel>
                                        {
                                            (alertIfFormIsEmpty === true)
                                            &&
                                            <span>
                                                <br />
                                                <Alert variant="danger" className="scaled-transition shadow-prev-container"> <b>Lengkapi form ... !!</b> <br /> Form tidak boleh ada yang kosong</Alert>
                                            </span>
                                        }
                                    </Form.Group>
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                                        <Button variant={changeThemeButtonPostingArtikel} onClick={() => postNewArtikel()}> Selanjutnya </Button>
                                    </div>
                                </div>
                            </Collapse>
                    }
                </div>
            </div>
            <br />
        </>
    )
}

export default CreateArtikel