import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import NavbarOfConversations from './NavbarOfConversations'
import NavbarOfChatList from './NavbarOfChatList'
import PersonalChatBubble from './PersonalChatBubble'
import PersonalChatList from './PersonalChatList'
import UserContext from '../../context/Context'
import { apiURL } from '../../Api'

const ChatPage = () => {

    const { userID } = useContext(UserContext)
    const [ws, setWs] = useState()
    const [sendingMessage, setSendingMessage] = useState([])
    const [receivingMessage, setReceivingMessage] = useState([])
    const [status, setStatus] = useState("")
    const [conversationistId, setConversationistId] = useState(0)
    const [showConversationRoom, setShowConversationRoom] = useState(false)

    // Implementasi => chat ini menggunakan websocket dari fastAPI
    // const sendingMessages = () => {
    //     ws.send(sendingMessage)
    //     ws.onmessage = (e) => {
    //         setReceivingMessage([...receivingMessage, e.data])
    //     }
    //     setReceivingMessage([])
    // }

    // useEffect(() => {
    //     // open comunication with server
    //     webSckt.onopen = () => {
    //         webSckt.send("Connect")
    //     }
    //     // Menerima (received) pesan dari server
    //     webSckt.onmessage = (e) => {
    //         setReceivingMessage([...sendingMessage, e.data])
    //     }

    //     webSckt.onclose = (event) => {
    //         if (event.wasClean) {
    //             alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    //         } else {
    //             // e.g. server process killed or network down
    //             // event.code is usually 1006 in this case
    //             alert('[close] Connection died');
    //         }
    //     };

    //     // Error handling webSocket
    //     webSckt.onerror = function () {
    //         alert(`[error]`)
    //     }

    //     setWs(webSckt)

    //     return () => {
    //         webSckt.close()
    //     }

    // }, [sendingMessage])

    useEffect(() => {
        let socket = new WebSocket(apiURL(userID).CHAT_WEBSOCKET) // inisialisasi websocket dari FastAPI

        socket.onopen = (e) => {
            if (e.isTrusted === true) {
                setConversationistId(userID)
                setStatus("Online")
            }
        };

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setReceivingMessage((prev) => [...prev, message])
        };

        socket.onclose = (e) => {
            if (e.wasClean) {
                if (e.isTrusted === true) {
                    setStatus("Offline")
                }
            } else {
                console.log('[close] Connection died')
            }
        };

        socket.onerror = (e) => {
            console.log(`[error]`)
        };

        setWs(socket)
        return () => { socket.close() };
    }, [userID])

    const sendMessage = () => {
        ws.send(sendingMessage)

        // recieve message every send message
        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setReceivingMessage((prev) => [...prev, message])
        }
        setSendingMessage([])
    };

    return (
        <>
            <section className='chat-container'>
                <div className='chatlist-container'>
                    <NavbarOfChatList />
                    <PersonalChatList />
                </div>
                <div className='conversations-container'>
                    <NavbarOfConversations status={status} conversationistId={conversationistId} />
                    <div className='conversations-content-container'>
                        {

                        }
                        <section className='pb-5 mb-5'>
                            {
                                receivingMessage.map((result, i) => {
                                    return ((result.message !== "Offline")
                                        ? (userID === result.clientId)
                                            ?
                                            <PersonalChatBubble key={i} itsme={"me"} message={result.message} />
                                            :
                                            <PersonalChatBubble key={i} itsme={"other"} message={result.message} />
                                        : null)
                                })
                            }
                        </section>
                    </div>
                    <div className='form-text-input'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img className='chat-avatar-conversations mx-2' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " />
                        </div>
                        <div className='w-50 d-flex justify-content-center align-items-center pt-3'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Ketik pesan"
                                    aria-label="Ketik pesan"
                                    aria-describedby="basic-addon2"
                                    size='lg'
                                    value={sendingMessage}
                                    onChange={(e) => { setSendingMessage(e.target.value) }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage()
                                        }
                                    }}
                                />
                                <Button variant="info bi bi-send-fill" id="button-addon2" onClick={sendMessage}>Kirim</Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default ChatPage