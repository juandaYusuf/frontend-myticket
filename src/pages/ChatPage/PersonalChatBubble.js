import React from 'react'

const PersonalChatBubble = (props) => {



    return (
        <div className={(props.itsme === "me")? "chat-bubble-container-me":"chat-bubble-container-other"}>
            {
                (props.itsme === "me")
                    ?
                    <div className='d-flex gap-2'>
                        <div className='chat-bubble-me '>
                            <span> {props.message} </span><br />
                            <p className='chat-date' >20-12-2023</p>
                        </div>
                        <div>
                            <img className='chat-avatar-conversations ' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " />
                        </div>
                    </div>
                    :
                    <div className='d-flex gap-2 '>
                        <div>
                            <img className='chat-avatar-conversations ' src='https://images.unsplash.com/photo-1606413712024-0df0371d35a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3Jhbmd8ZW58MHx8MHx8&w=1000&q=80' alt=" " />
                        </div>
                        <div className='chat-bubble-other '>
                            <span> {props.message} </span><br />
                            <p className='chat-date' >20-12-2023</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default PersonalChatBubble