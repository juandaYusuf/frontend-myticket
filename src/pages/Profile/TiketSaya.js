import React, { useContext, useEffect, useState } from 'react'
import TicketComponent from '../Ticket/TicketComponent'
import EmptyPage from '../EmptyPage'
import axios from 'axios';
import UserContext from '../../context/Context';

const TiketSaya = () => {

  const { userID } = useContext(UserContext)
  const [isAvailable, setIsAvailable] = useState(false)
  const [myTiket, setMyTiket] = useState([])
  const fromWhere = "tiketSaya"

  const tiketSaya = () => {
    const apiURL = `http://127.0.0.1:8000/tiket_saya/${userID}`
    axios.get(apiURL).then((response) => {
      if (response.data.length === 0) {
        setIsAvailable(false)
      } else {
        setIsAvailable(true)
        setMyTiket(response.data)
      }
    })
  }


  useEffect(() => {
    tiketSaya()
  }, [])



  return (
    <>
      <div className='tiket-saya-container scaled-transition'>
        {
          (isAvailable === false)
            ?
            <EmptyPage fromwhere={fromWhere} />
            :
            myTiket.map((data) => {
              return <TicketComponent key={data.id} fromwhere={fromWhere} mytiketid={data.tiket_id} purchasetime={data.tanggal} />
            })
        }
      </div>
      <hr />
    </>
  )
}

export default TiketSaya