import React from 'react'
import { Navbar } from 'react-bootstrap'

const NavbarOfConversations = () => {
    return (
        <Navbar className='py-0 px-2 ' variant="light" bg="none" sticky='top' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderBottom: "solid 1px white", backdropFilter: "blur(20px)" }} >
            <Navbar.Brand ><img className='chat-avatar-conversations' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " /></Navbar.Brand>
            <Navbar.Text>
                <strong className='text-dark m-0 p-0'>Ahmad zakarya</strong>
                <p className='fw-light m-0 p-0'>Online</p>
            </Navbar.Text>
        </Navbar>
    )
}

export default NavbarOfConversations