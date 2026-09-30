import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getChat } from "../model/chat-by-id.js"
import { MessageContainer } from "./message.jsx"


export function ChatPage () {
    const [isNewChat, setIsNewChat] = useState(true)
    const [messages, setMessages] = useState([])
    const { chat_id } = useParams(); 
    const [currentInput, setCurrentInput] = useState('')

    useEffect(() => {
        async function startSearchingChat() {
            const res = await getChat("123")
            if (res?.chat) {
                setMessages(res.chat)
                setIsNewChat(false)
            }
        }
        if (chat_id) {
            startSearchingChat()
        }
    }, [])

    return (
        <main>
            <div className="container">
                <div className="chat__container">
                    <div className="chat__area">
                        {isNewChat ? 
                            <h1>Привет! Что бы хотели уточнить?</h1>
                        : messages?.map((el, idx) => 
                            <MessageContainer key={idx} message={el.text} time={el.timestamp} position={el.sender_id == 0}/>
                        )}
                    </div>
                    <div className="input__area">
                        <input type="text" placeholder="Введите Ваш Запрос" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}/>
                        <button>+</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
