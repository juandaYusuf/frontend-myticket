import React from 'react'

const PersonalChatList = () => {
    return (
        <div className='personal-chat-container change-cursor '>
            <img className='chat-avatar-conversations' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " />
            <div className='chat-desc'>
                <strong>Ahmad zakarya</strong>
                <span className='fw-light'>Ini adalah preview isi personal chat</span>
            </div>
        </div>
    )
}

export default PersonalChatList