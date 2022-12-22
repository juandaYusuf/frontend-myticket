import React from 'react'
import { useState } from "react"
import axios from 'axios'
import { Form, Button, Alert, Col, FloatingLabel, Row } from "react-bootstrap"
import TicketComponent from './TicketComponent';

function PemesananComponent() {

    const [getAsalStasiun, setAsalStasiun] = useState("")
    const [getStasiunTujuan, setStasiunTujuan] = useState("")
    const [getShowAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [tiketID, setTiketID] = useState(0)
    const [namaKereta, setNamaKereta] = useState("")
    const [jmlGerbong, setJmlGerbong] = useState("")
    const [kelasKereta, setKelasKereta] = useState("")
    const [stsAsal, setStsAsal] = useState("")
    const [stsTujuan, setStsTujuan] = useState("")
    const [waktuBerangkat, setWaktuBerangkat] = useState("")
    const [waktuTiba, setWaktuTiba] = useState("")
    const [harga, setharga] = useState("")
    const [showTiket, setShowTiket] = useState(false)
    const [datePembelian, setDatePembelian] = useState("")
    const [optionsStsTujuan, setOptionsStsTujuan] = useState([])
    const [optionsStsAsal, setOptionsStsAsal] = useState("")


    // Date formating
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    // console.log(`${ye}-${mo}-${da}`);


    const formValidation = () => {
        if (getAsalStasiun === "" || getAsalStasiun === "Pilih stasiun asal") {
            setShowTiket(false)
            setShowAlert(true)
            setAlertMessage("Silahkan Pilih stasiun asal, stasiun tujuan")
        } else if (getStasiunTujuan === "" || getStasiunTujuan === "Pilih stasiun tujuan") {
            setShowTiket(false)
            setShowAlert(true)
            setAlertMessage("Silahkan Pilih stasiun tujuan")
        } else {
            setShowAlert(false)
            getTiket()
        }
    }

    const optionDataStsTujuan = () => {
        axios.get(`http://127.0.0.1:8000/show_tiket/`).then((response) => {
            setOptionsStsTujuan(response.data)
        })
    }

    
    const optionDataStsAsal = () => {
        axios.get(`http://127.0.0.1:8000/show_tiket/`).then((response) => {
            setOptionsStsAsal(response.data[0].stasiun_asal)
        })
    }

    const getTiket = () => {
        const apiURL = `http://127.0.0.1:8000/order_tiket/`
        const data = {
            stasiun_asal: getAsalStasiun,
            stasiun_tujuan: getStasiunTujuan
        }
        axios.post(apiURL, data).then((response) => {
            if (response.data) {
                setTiketID(response.data.id)
                setNamaKereta(response.data.nama_kereta)
                setJmlGerbong(response.data.jumlah_gerbong)
                setKelasKereta(response.data.kelas)
                setStsAsal(response.data.stasiun_asal)
                setStsTujuan(response.data.stasiun_tujuan)
                setWaktuBerangkat(response.data.waktu_keberangkatan)
                setWaktuTiba(response.data.waktu_tiba)
                setharga(response.data.harga)
                setDatePembelian(`${ye}-${mo}-${da}`)
                setShowTiket(true)
            }
        })
    }


    return (
        <>
            <div className='tiket-container'>
                <div className='form-pemesanan scaled-transition shadow-prev-container'>
                    <h1 style={{ color: "white" }}> <b className='my-ticket'>MyTicket</b>  | <i className="bi bi-ticket-detailed-fill"></i> Beli tiket</h1>
                    <hr style={{ color: "white" }} />
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Stasiun Asal">
                                <Form.Select aria-label="Floating label select" onChange={(e) => { setAsalStasiun(e.currentTarget.value) }} onClick={() => { optionDataStsAsal() }}>
                                    <option>Pilih stasiun asal</option>
                                    <option value={optionsStsAsal}> {optionsStsAsal}</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Stasiun Tujuan">
                                <Form.Select aria-label="Floating label select" value={getStasiunTujuan} onChange={(e) => { setStasiunTujuan(e.currentTarget.value) }} onClick={() => { optionDataStsTujuan() }}>
                                    <option>Pilih stasiun tujuan</option>
                                    {
                                        optionsStsTujuan.map((result) => {
                                            return <option key={result.id} value={result.stasiun_tujuan}>{result.stasiun_tujuan}</option>
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <div />
                        <Button
                            onClick={() => {
                                formValidation()
                            }}
                            className='btn btn-warning'>
                            <p style={{ margin: "5px" }}> <i className="bi bi-search"></i> Cari & pesan tiket</p>
                        </Button>
                    </Row>
                </div>

                <div className='Alert-layout'>
                    {
                        (getShowAlert === true)
                        &&
                        <Alert variant="danger">
                            <b>Tidak dapat menampilkan tiket</b> <br /> {alertMessage}. Perhatikan asal dan tujuan stasiun agar tidak salah menaiki kereta
                        </Alert>
                    }
                    {
                        (showTiket === true)
                        &&
                        <TicketComponent
                            fromwhere={"pemesanan"}
                            tiketid={tiketID}
                            namakereta={namaKereta}
                            jumlahgerbong={jmlGerbong}
                            kelaskereta={kelasKereta}
                            stsasal={stsAsal}
                            ststujuan={stsTujuan}
                            waktuberangkat={waktuBerangkat}
                            waktutiba={waktuTiba}
                            harga={harga}
                            datebuy={datePembelian}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default PemesananComponent