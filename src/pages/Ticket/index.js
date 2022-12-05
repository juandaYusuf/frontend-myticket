import React from 'react'
import NavigationBar from '../Navbar'
import TicketComponent from './TicketComponent';
import PemesananComponent from './PemesananComponent';

const Ticket = () => {

  return (
    <>
      <NavigationBar />
      <div className='banner' >
        <PemesananComponent />
      </div>
    </>
  )
}

export default Ticket