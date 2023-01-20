import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import UserContext from '../../context/Context'


const TicketComponent = (props) => {

    const { userID, setUserSaldo } = useContext(UserContext)
    const [namaKereta, setNamaKereta] = useState("")
    const [jumlahGerbong, setJumlahGerbong] = useState(0)
    const [kelasKereta, setKelasKereta] = useState("")
    const [stsAsal, setstsAsal] = useState("")
    const [waktuKeberangkatan, setWaktuKeberangkatan] = useState("")
    const [stsTujuan, setStsTujuan] = useState("")
    const [hargaKereta, setHargaKereta] = useState("")
    const [mytiketID, setMytiketID] = useState(props.mytiketid)
    const [owner, setOwner] = useState("")
    const [waktuTiba, setWaktuTiba] = useState("")
    const [isTicketSold, setIsTicketSold] = useState("")
    const [updateUserSaldo, setUpdateUserSaldo] = useState(0)

    const beliTiket = () => {
        let userSaldo = 0
        let userSaldoIfMinus = 0
        const apiUrlPembelian = `http://127.0.0.1:8000/pembelian_tiket/`
        const apiUrlUserSaldo = `http://127.0.0.1:8000/saldo/?userID=${userID}`
        const apiUrlUpdateSaldo = `http://127.0.0.1:8000/topup/${userID}/${updateUserSaldo}`
        const dataPembelian = {
            "user_id": userID,
            "tiket_id": props.tiketid,
            "tanggal": props.datebuy
        }
            // check user saldo
            axios.get(apiUrlUserSaldo).then((response) => {
                userSaldo = response.data.saldo - 8000
                userSaldoIfMinus = response.data.saldo
                if (userSaldo < 0) {
                    console.log("Saldo anda tidak cukup", userSaldo)
                    setUserSaldo(userSaldoIfMinus)
                    setIsTicketSold("failed")
                } else {
                    axios.post(apiUrlUpdateSaldo).then(() => {
                        setUserSaldo(userSaldo)
                        setUpdateUserSaldo(userSaldo)
                        axios.post(apiUrlPembelian, dataPembelian).then(() => {
                            console.log("Pembelian berhasil")
                            setIsTicketSold("success")
                        })
                    })
                }
            })
    }

    const showTiketSaya = () => {
        axios.get(`http://127.0.0.1:8000/bought_tiket/${mytiketID}`).then((response) => {
            setNamaKereta(response.data[0].nama_kereta)
            setJumlahGerbong(response.data[0].jumlah_gerbong)
            setKelasKereta(response.data[0].kelas)
            setstsAsal(response.data[0].stasiun_asal)
            setWaktuKeberangkatan(response.data[0].waktu_keberangkatan)
            setStsTujuan(response.data[0].stasiun_tujuan)
            setHargaKereta(response.data[0].harga)
            setWaktuTiba(response.data[0].waktu_tiba)
        })
    }

    const getAuthor = () => {
        axios.get(`http://127.0.0.1:8000/profile/${userID}`).then((response) => {
            setOwner(response.data.fullname)
        })
    }

    useEffect(() => {
        if (props.fromwhere === "tiketSaya") {
            showTiketSaya()
            getAuthor()
        }
        setMytiketID(props.mytiketid)
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {
                (isTicketSold === "berhasil")
                ?
                <Alert variant='success'> <b>Pembelian tiket berhasil !</b> <br /> Silahkan lihat pada halaman profile</Alert>
                :
                (isTicketSold === "failed")
                &&
                <Alert variant='danger'> <b>Pembelian tiket gagal !</b> <br /> Silahkan topup pada halaman profile</Alert>
            }
            {
                (props.fromwhere === "pemesanan")
                &&
                //   Pemesanan
                <div className='ticket-card scaled-transition shadow-prev-container scale-up-animation'>
                    <br />
                    <div className='nama-kereta'>
                        <h4><b> {props.namakereta} </b></h4>
                        <h6>Jumlah Gerbong {props.jumlahgerbong}</h6>
                        <p>{props.kelaskereta}</p>
                    </div>
                    <div className='Keberangkatan-kereta'>
                        <div className='asal'>
                            <b>{props.stsasal}</b>
                            <b>{props.waktuberangkat}</b>
                        </div>
                        <div className='durasi'>
                            <b className='arrow'>To</b>
                        </div>
                        <div className='tujuan'>
                            <b>{props.ststujuan}</b>
                            <b>{props.waktutiba}</b>
                        </div>
                    </div>
                    <div className='Harga-tiket'>
                        <h6>Rp. {props.harga}</h6>
                        <Button onClick={() => {
                            beliTiket()
                        }} className='btn btn-warning'>
                            Beli Tiket
                        </Button>
                    </div>
                </div>
            }
            {
                (props.fromwhere === "tiketSaya")
                &&
                //Tiket saya 
                <div className='ticket-card scaled-transition shadow-prev-container'>
                    <div className='Harga-tiket'>
                        <h6 style={{ textDecoration: "underline" }}>Paid</h6>
                        <span>{props.purchasetime}</span>
                        <hr />
                    </div>
                    <div className='nama-kereta'>
                        <h4><b> {namaKereta} </b></h4>
                        <h6>Jumlah Gerbong {jumlahGerbong}</h6>
                        <p>{kelasKereta}</p>
                    </div>
                    <img src='https://barcode.tec-it.com/barcode.ashx?data=978020137962&code=EAN13&translate-esc=true&color=ffffff&bgcolor=0d6dfd' alt='Gambar tidak tersedia' />
                    <div className='Keberangkatan-kereta'>
                        <div className='asal'>
                            <b>{stsAsal}</b>
                            <b>{waktuKeberangkatan}</b>
                        </div>
                        <div className='durasi'>
                            <b className='arrow'>To</b>
                        </div>
                        <div className='tujuan'>
                            <b>{stsTujuan}</b>
                            <b>{waktuTiba}</b>
                        </div>
                    </div>
                    <div className='Harga-tiket'>
                        <h6>Rp. {hargaKereta}</h6>
                        <span>{owner}</span>
                    </div>
                </div>
            }
        </>
    )
}

export default TicketComponent