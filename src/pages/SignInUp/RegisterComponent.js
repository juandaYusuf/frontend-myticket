import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Alert } from "react-bootstrap";

function RegisterComponent() {

    const [Nama, setNama] = useState("");
    const [Email, setEmail] = useState("");
    const [Alamat, setAlamat] = useState("");
    const [NoTlp, setNoTlp] = useState("");
    const [Password, setPassword] = useState("");
    const [JenisKelamin, setJenisKelamin] = useState("");
    const [ShowAlert, setShowAlert] = useState("");
    const [AlertMessage, setAlertMessage] = useState("");

    const register = () => {
        const apiURL = `http://127.0.0.1:8000/register/`
        let regData = {
            "fullname": Nama,
            "email": Email,
            "alamat": Alamat,
            "noTelepon": NoTlp,
            "password": Password,
            "jenisKelamin": JenisKelamin,
            "profilPhoto": "",
            "profilBannerPhoto": ""
        }
        axios.post(apiURL, regData).then((response) => {
            if (response) {
                setNama("")
                setEmail("")
                setAlamat("")
                setNoTlp("")
                setPassword("")
                setJenisKelamin("")
                setShowAlert("berhasil")
            }
        })
    }

    const validation = () => {
        if (JenisKelamin === "" ||
            NoTlp === "" ||
            Alamat === "" ||
            Email === "" ||
            Nama === "") {
            setAlertMessage("Lengkapi Form Pendaftaran")
            setShowAlert("gagal")
        } else if (Password.length < 8) {
            setAlertMessage("Password kurang dari 8")
            setShowAlert("gagal")
        } else if (JenisKelamin === "Jenis Kelamin") {
            setAlertMessage("Pilih jenis kelamin")
        } else {
            register()
        }
    }

    return (
        <>
            <div className='card-login'>
                <Form>
                    <Form.Group className="mb-3" controlId="fullname">
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control type="text" placeholder="Masukan nama lengkap" value={Nama} onChange={(e) => setNama(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@gmail.com" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="alamat">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control type="text" placeholder="Masukan alamat tempat tinggal" value={Alamat} onChange={(e) => setAlamat(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nohp">
                        <Form.Label>No HP</Form.Label>
                        <Form.Control type="number" placeholder="082xxxxxxxxx" value={NoTlp} onChange={(e) => setNoTlp(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control autoComplete='none' type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select aria-label="Default select example" value={JenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)} >
                        <option>Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                </Form>

                <br />
                {
                    (ShowAlert === "berhasil")
                        ?
                        <Alert variant="success">
                            Registrasi berhasil! Silahkan Login.
                        </Alert>
                        : (ShowAlert === "gagal")
                        &&
                        <Alert variant="danger">
                            {AlertMessage}
                        </Alert>
                }

                <Alert variant="warning">
                    <Alert.Heading>GUNAKAN IDENTITAS SEMBARANG</Alert.Heading>
                    <p>
                        Untuk Melakukan demo gunakanlah identitas sembarang <br/> Terimakasih 🔥😎
                    </p>
                    <hr />
                    <p className="mb-0">
                        STT Wastukencana | Tahun ajaran 2021 - 2022.
                    </p>
                </Alert>
                <div className="d-grid gap-2">
                    <Button type='submit' variant="success" onClick={() => {
                        validation()
                    }}>
                        Daftar
                    </Button>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent