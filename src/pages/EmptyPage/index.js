import React, { useEffect, useState } from 'react'

const EmptyPage = (props) => {

    const [fromWhere, setFromWhere] = useState(props.fromwhere);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");


    useEffect(() => {
        if(fromWhere === "tiketSaya"){ 
            setTitle("Tidak ada tiket")
            setBody("Anda belum memiliki tiket! Silahkan beli tiket sesuai tujuan")
        }else if(fromWhere ==="artikelCollections"){
            setTitle("Tidak ada artikel")
            setBody("Anda belum memiliki artikel! Silahkan buat artikel anda sendiri.")
        }
    }, []);


    return (
        <div className='empty-page'>
            <div className='empty-page-icon' />
            <div className='empty-page-text'>
                <h1 style={{ color: "grey" }}>{title}</h1>
                <span style={{ color: "grey" }}>{body}</span>
            </div>
        </div>
    )
}

export default EmptyPage