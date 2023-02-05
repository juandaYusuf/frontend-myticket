import React from 'react'
import { Button, Form } from 'react-bootstrap'
import NavbarOfConversations from './NavbarOfConversations'
import NavbarOfChatList from './NavbarOfChatList'
import PersonalChatBubble from './PersonalChatBubble'
import PersonalChatList from './PersonalChatList'

const ChatPage = () => {
    return (
        <>
            <section className='chat-container'>
                <div className='chatlist-container'>
                    <NavbarOfChatList />
                    {
                        [1, 2, 3].map(() => {
                            return (<PersonalChatList />)
                        })
                    }
                </div>
                <div className='conversations-container'>
                    <NavbarOfConversations />
                    <div className='conversations-content-container'>
                        <section className='pb-5 mb-5'>
                            {
                                [1, 2, 3].map((result) => {
                                    return ((result % 2 === 0)?<PersonalChatBubble itsme="me"/>:<PersonalChatBubble itsme="other" />)
                                })
                            }
                        </section>
                    </div>
                    <div className='form-text-input'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img className='chat-avatar-conversations mx-2' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " />
                        </div>
                        <Form.Control className='border-secondary text-dark' style={{ backgroundColor: "rgba(128, 128, 128, 0.3)", backdropFilter: "blur(20px)" }} type="text" size='lg' id="inputChat" aria-describedby="chat" placeholder='Ketik pesan disini' />
                        <Button className='bi bi-send-fill mx-2 border-secondary' variant='info' style={{ width: "100px" }}> Kirim</Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChatPage