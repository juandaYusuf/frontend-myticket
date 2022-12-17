import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Form, Col, Row, Alert } from "react-bootstrap"
import UserContext from '../../context/Context';
import ModalUploadPhoto from './MoodalUploadPhoto';

function EditProfile(props) {

  const { userID } = useContext(UserContext)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [alamat, setAlamat] = useState("")
  const [noTelepon, setNoTelepon] = useState("")
  const [password, setPassword] = useState("")
  const [jenisKelamin, setJenisKelamin] = useState("")
  const [showAlert, setShowAlert] = useState("default")
  const [editProfile, setEditProfile] = useState("false")
  const [modalUpload, setModalUpload] = useState(false)
  const [checkLengthOfFullname, setcheckLengthOfFullname] = useState(false);


  const profileUser = () => {
    axios.get(`http://127.0.0.1:8000/profile/${userID}`).then((response) => {
      setFullName(response.data.fullname)
      setEmail(response.data.email)
      setAlamat(response.data.alamat)
      setNoTelepon(response.data.noTelepon)
      setPassword(response.data.password)
      setJenisKelamin(response.data.jenisKelamin)
    })
    props.refreshTitle()
  }

  const formValidation = () => {
    if (fullName.length > 50) {
      setcheckLengthOfFullname(true)
    } else {
      if (
        fullName === "" ||
        email === "" ||
        alamat === "" ||
        noTelepon === "" ||
        password === "" ||
        jenisKelamin === ""
      ) {
        setShowAlert("gagal")
      } else {
        updateData()
        profileUser()
        setShowAlert("sukses")
        setcheckLengthOfFullname(false)
      }
    }
  }

  const updateData = () => {
    axios.put(`http://127.0.0.1:8000/update/${userID}`, {
      "fullname": fullName,
      "email": email,
      "alamat": alamat,
      "noTelepon": noTelepon,
      "password": password,
      "jenisKelamin": jenisKelamin,
      "profilPhoto": "",
      "profilBannerPhoto": ""
    })
  }

  const refreshName = () => {
    axios.get(`http://127.0.0.1:8000/profile/${userID}`).then((response) => {
      setFullName(response.data.fullname)
      setEmail(response.data.email)
      setNoTelepon(response.data.noTelepon)
    })
  }

  useEffect(() => {
    profileUser()
    refreshName()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setFullName(fullName)
    setEmail(email)
    setAlamat(alamat)
    setNoTelepon(noTelepon)
    setPassword(password)
    setJenisKelamin(jenisKelamin)
  }, [fullName, email, alamat, noTelepon, password, jenisKelamin]);




  return (
    <>
      <div className='scaled-transition'>
        <Form >
          <div className='profile-form-row'>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label >Nama Lengkap</Form.Label>
              <Form.Control
                className='mr-3'
                type="text"
                placeholder={fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {
                (checkLengthOfFullname === true)
                  ?
                  <Form.Text className="text-muted" >
                    <span style={{ color: "red" }}>Nama tidak boleh lebih dari 50 character</span>
                  </Form.Text>
                  : null
              }
            </Form.Group>
            <span className='m-2' />
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Sebaiknya tidak menggunakan email utama anda
              </Form.Text>
            </Form.Group>
          </div>

          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label className='mt-1'>Alamat</Form.Label>
            <Form.Control
              type="text"
              placeholder={alamat}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </Form.Group>

          <div className='profile-form-row'>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>No HP</Form.Label>
              <Form.Control
                type="text"
                placeholder={noTelepon}
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
              />
            </Form.Group>
            <span className='m-2' />
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Password</Form.Label>
              <div className='btn btn-primary'
                style={
                  {
                    height: "37px",
                    color: "grey",
                    display: "flex",
                    border: "solid 1px pink ",
                    opacity: ".8",
                    backgroundColor: "lightgrey"
                  }
                }
                onClick={() => {
                  setModalUpload(true)
                  setEditProfile("true")
                }}>
                Ubah password 🔒
              </div>
            </Form.Group>
          </div>

          {
            (jenisKelamin) === "Laki-laki"
              ?
              <Form.Group as={Col} controlId="man">
                <Form.Label className='mt-3'>Jenis Kelamin</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={jenisKelamin}
                  onChange={(e) => {
                    setJenisKelamin(e.target.value)
                  }}>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
              :
              <Form.Group as={Col} controlId="woman">
                <Form.Label className='mt-3'>Jenis Kelamin</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={jenisKelamin}
                  onChange={(e) => {
                    setJenisKelamin(e.target.value)
                  }}>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </Form.Select>
              </Form.Group>
          }
          <br />
          <div style={{ margin: "10px" }}>
            {
              (showAlert === "gagal")
                ?
                <span>
                  <Alert variant="danger">
                    <b>Update porfile gagal!<br /></b>Periksa kembali form edit anda
                  </Alert>
                  <hr />
                </span>
                : (showAlert === "sukses") &&
                <span>
                  <Alert variant="success">
                    <b>Update porfile berhasil!<br /></b>Profile telah di perbaharui
                  </Alert>
                </span>
            }

            <hr />
            <Row>
              <div className='btn btn-primary shadow-prev-container'
                onClick={() => {
                  formValidation()
                }} >
                Simpan edit data
              </div>
            </Row>
          </div>
        </Form>
        <hr />

        <ModalUploadPhoto
          editprofile={editProfile}
          show={modalUpload}
          onHide={() => setModalUpload(false)}
        />
      </div>
    </>
  )
}

export default EditProfile