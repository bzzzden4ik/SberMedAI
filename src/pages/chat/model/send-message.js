import { getAnswer } from "../api/message.js"


const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

export const sendMessage = async (message, chat_id, user_id, setMessages) => {
    const now = new Date();

    const formattedDate = formatter.format(now).replace(', ', '-').replace(/:(\d{2})$/, '.$1');

    setMessages(prev => [...prev, {
        sender_id: user_id,
        time_stamp: formattedDate,
        text: message,
    }])

    const res = await getAnswer(message, chat_id)
    if (res) {
        setItems(prev => [...prev, res.answer]);
    }
}