
import './App.css';

import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';

const socket = io.connect("https://simple-chat-app-backend.vercel.app/", {
  withCredentials: true,
  
});
const userName = nanoid(4);



function App() {
  const[message, setMessage] = useState("");
  const[chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, userName});

    setMessage("");
  }
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    })
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Chat</h1>
        {chat && 
          chat.map((payload, index) => (
            <p key={index}>message : {payload.message}  , <span> id : {payload.userName}</span></p>
          ))
        }
       <form onSubmit={sendChat}>
        <input type="text" name = "chat" placeholder='send text' value={message} onChange={(e) => setMessage(e.target.value)} />
        
       </form>
       <button onClick={sendChat}>send </button>
      </header>
    </div>
  );
}

export default App;
