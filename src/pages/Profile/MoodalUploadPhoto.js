import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap";
import UserContext from "../../context/Context";

const ModalUploadPhoto = (props) => {

    const { userID } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [fileTypeHandling, setFileTypeHandling] = useState(true)
    const [currentPwd, setCurrentPwd] = useState("")
    const [isPasswordAvailable, setIsPasswordAvailable] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [alertIsPasswordConfirm, setAlertIsPasswordConfirm] = useState("")
    const [uploadImage, setUploadImage] = useState(null)
    const [profilePicture, setProfilePicture] = useState("")
    const [bannerPicture, setBannerPicture] = useState("")



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
        } else {
            setFileTypeHandling(false)
            e.target.value = ""
            setImage("")
        }
    }

    const handleKeyPressCurrentPassword = (e) => {
        if (e.charCode === 13) {
            e.preventDefault()
            checkPwdByID()
        }
    }

    const handleKeyPressUpdatePassword = (e) => {
        if (e.charCode === 13) {
            e.preventDefault()
            passwordConfirmation()
        }
    }

    const changePassword = () => {
        const apiURL = `http://127.0.0.1:8000/changepassword/${userID}`
        axios.put(apiURL, {
            "password": confirmNewPassword
        }).then((response) => {
            if (response.data !== null) {
                setAlertIsPasswordConfirm("passwordIsCorrect")
                setNewPassword("")
                setConfirmNewPassword("")
            }
        })
    }

    //! Upload file to BackEnd profile picture
    const changeProfilePhoto = () => {
        let bodyFormData = new FormData()
        bodyFormData.append("image", uploadImage)
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/image/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                setProfilePicture(response.data.url)
            })
            .catch((err) => {
                alert("Error dari backend", err);
            });
    }

    // !Upload file to BackEnd banner picture
    const changeBannerPhoto = () => {
        let bodyFormData = new FormData()
        bodyFormData.append("image", uploadImage)
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/image/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.data) {
                    setBannerPicture(response.data.url)
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    // !Apply to database user (Profile)
    const updateProfilePictureHandling = () => {
        const apiURL = `http://127.0.0.1:8000/profile_picture/${userID}`
        const data = {
            "profilPhoto": profilePicture
        }
        axios.put(apiURL, data)
            .then((response) => {
                if (response.data) {
                    props.closewhenimageuploaded()
                    setImage("")
                    setFileTypeHandling(true)
                    setIsPasswordAvailable("")
                    setAlertIsPasswordConfirm("")
                }
            })
    }


    // !Apply to database user (Banner)
    const updateBannerPictureHandling = () => {
        const apiURL = `http://127.0.0.1:8000/banner_picture/${userID}`
        const data = {
            "profilBannerPhoto": bannerPicture
        }
        axios.put(apiURL, data)
            .then((response) => {
                if (response.data) {
                    props.closewhenimageuploaded()
                    setImage("")
                    setFileTypeHandling(true)
                    setIsPasswordAvailable("")
                    setAlertIsPasswordConfirm("")
                }
            })
    }

    const passwordConfirmation = () => {
        if (newPassword === confirmNewPassword) {
            if (newPassword !== "" && confirmNewPassword !== "") {
                if (newPassword.length < 8 || confirmNewPassword.length < 8) {
                    setAlertIsPasswordConfirm("pwdLessThan8Char")
                } else {
                    setNewPassword("")
                    setConfirmNewPassword("")
                    changePassword()
                }
            } else {
                setAlertIsPasswordConfirm("formIsEmpty")
            }
        } else {
            setAlertIsPasswordConfirm("passwordDoesNotMatch")
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }

    const checkPwdByID = () => {
        const apiURL = "http://127.0.0.1:8000/checkcurrentpassword/"
        axios.post(apiURL, {
            "id": userID,
            "password": currentPwd
        }).then((response) => {
            if (response.data !== null) {
                if (response.data.id === userID) {
                    setIsPasswordAvailable("valid")
                    setCurrentPwd("")
                }
            } else {
                setIsPasswordAvailable("invalid")
                setCurrentPwd("")
            }
        })
    }

    useEffect(() => {
        if (profilePicture) {
            updateProfilePictureHandling()
        }
        // eslint-disable-next-line
    }, [profilePicture]);


    useEffect(() => {
        if (bannerPicture) {
            updateBannerPictureHandling()
        }
        // eslint-disable-next-line
    }, [bannerPicture]);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                style={{backdropFilter: "blur(30px)"}}>
                <Modal.Header closeButton onHide={() => {
                    setImage("")
                    setFileTypeHandling(true)
                    setIsPasswordAvailable("")
                    setAlertIsPasswordConfirm("")
                }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>
                            {
                                (props.modaltitle)
                                    ?
                                    props.modaltitle
                                    :
                                    "Password"
                            }
                        </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{
                        (props.editprofile)
                            ?
                            (isPasswordAvailable === "valid")
                                ?
                                "Password baru"
                                :
                                "Ubah password"
                            :
                            "Upload photo"}
                    </h5>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label> {
                            (props.editprofile)
                                ?
                                (isPasswordAvailable === "valid")
                                    ?
                                    "Update password baru"
                                    :
                                    "Masukan password saat ini"
                                :
                                "Pilih gambar dari galery"
                        }
                        </Form.Label>
                        {
                            (props.editprofile)
                                ?
                                (isPasswordAvailable === "valid")
                                    ?
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">🔒</InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Masukan password baru"
                                                value={newPassword}
                                                autoComplete="none"
                                                onKeyPress={handleKeyPressUpdatePassword}
                                                onChange={(e) => setNewPassword(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">🔒</InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm password baru"
                                                value={confirmNewPassword}
                                                autoComplete="none"
                                                onKeyPress={handleKeyPressUpdatePassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                        </InputGroup>
                                        {
                                            (alertIsPasswordConfirm === "passwordDoesNotMatch")
                                                ?
                                                <Alert
                                                    variant="danger">
                                                    <b>Password tidak sesuai ‼️</b>
                                                    <br />
                                                    Silahkan periksa kembali password baru dan confirm password baru
                                                </Alert>
                                                :
                                                (alertIsPasswordConfirm === "formIsEmpty")
                                                    ?
                                                    <Alert
                                                        variant="danger">
                                                        <b>Form kosong ‼️</b>
                                                        <br />
                                                        Form password tidak boleh kosong
                                                    </Alert>
                                                    :
                                                    (alertIsPasswordConfirm === "pwdLessThan8Char")
                                                        ?
                                                        <Alert
                                                            variant="warning">
                                                            <b>Password terlalu pendek ‼️</b>
                                                            <br />
                                                            Password harus lebih dari 8 character
                                                        </Alert>
                                                        :
                                                        (alertIsPasswordConfirm === "passwordIsCorrect")
                                                        &&
                                                        <Alert
                                                            variant="success">
                                                            <b>Berhasil ‼️</b>
                                                            <br />
                                                            Password berhasil diubah
                                                        </Alert>
                                        }
                                    </Form>
                                    :
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">🔒</InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password saat ini"
                                                value={currentPwd}
                                                autoComplete="none"
                                                autoFocus={true}
                                                onKeyPress={handleKeyPressCurrentPassword}
                                                onChange={(e) => setCurrentPwd(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form>
                                :
                                <Form.Control
                                    type="file"
                                    onChange={handleChangeImagePreview} />
                        }
                    </Form.Group>
                    {
                        (isPasswordAvailable === "invalid")
                        &&
                        <Alert variant="danger"><b>Password salah</b> <br /> Silahkan periksa kembali password dengan benar</Alert>
                    }
                    <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }
                    }>
                        {
                            (props.modaltitle)
                                ?
                                (image !== "")
                                    ?
                                    <img className={
                                        (props.modaltitle === "Upload photo profile")
                                            ?
                                            "modal-preview-profile"
                                            :
                                            "modal-preview-banner"
                                    } src={
                                        image
                                    } alt="Gambar tidak tersedia" />
                                    :
                                    null
                                :
                                null
                        }
                    </section>
                    <br />
                    {
                        (!fileTypeHandling)
                        &&
                        <Alert variant="danger">
                            Tipe gambar atau file tidak diizinkan
                        </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        (props.editprofile)
                            ?
                            (isPasswordAvailable === "valid")
                                ?
                                <Button variant="warning" onClick={() => {
                                    passwordConfirmation()
                                }}> Update password </Button>
                                :
                                <Button variant="warning" onClick={() => {
                                    checkPwdByID()
                                }}> Lanjutkan </Button>
                            :
                            (props.modaltitle === "Upload photo sampul")
                                ?
                                <Button onClick={() => {
                                    changeBannerPhoto()
                                }}> Upload </Button>
                                :
                                <Button onClick={() => {
                                    changeProfilePhoto()
                                }}> Upload </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default ModalUploadPhoto
