import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import React from 'react';
import Home from './components/Home';
import Inputs from './components/Inputs';
import imgChat from './components/assets/chat_publico-removebg-preview.png'


function App() {
const [visibilityLogin, setVisibilityLogin] = useState(true)
const [visibilityHome, setVisibilityHome] = useState(false)
const [nombreUsuario, setNombreUsuario] = useState(null)
const [sendMessage, setSendMessage] = useState({user: null, message: null})
const [messgesAlreadyExist, setMessagesAlreadyExist] = useState([])
const [reloadMessage, setReloadMessage] = useState(false)
const [numberUsersConected, setNumberUsersConected] = useState(0)
const [usersConected, setUsersConected] = useState([])
const chatContainerRef = useRef(null)
const [receiveMessage, setReceiveMessage] = useState(false)
// Logica coneccion backend

const apiSendMessage = "http://localhost:4000/sendMessage"

const sendMessageFunction =async () => {
  try {
    const response = await fetch(apiSendMessage, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(sendMessage)
    });
    if (response.ok) {
      console.log('Mensaje enviado con éxito');
         } else {
      console.error('Error al enviar el mensaje');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }


}

useEffect(() => {
sendMessageFunction()
}, [sendMessage])

const challengeVisibilityForm = () => {
  return(
    <React.Fragment>
<div className='little-console-container'>
  <div className='img-container'>
  <img className='img-chat' src={imgChat}/>
  <h1>Chat Publico</h1>
  </div>
</div>

      <Home receiveMessage={receiveMessage} setReceiveMessage={setReceiveMessage} chatContainerRef={chatContainerRef}  usersConected={usersConected} setUsersConected={setUsersConected} setVisibilityHome={setVisibilityHome} setVisibilityLogin={setVisibilityLogin} setNumberUsersConected={setNumberUsersConected} numberUsersConected={numberUsersConected} reloadMessage={reloadMessage} setReloadMessage={setReloadMessage} messgesAlreadyExist={messgesAlreadyExist} sendMessage={sendMessage} nombreUsuario={nombreUsuario} />
      <Inputs receiveMessage={receiveMessage} setReceiveMessage={setReceiveMessage} chatContainerRef={chatContainerRef} reloadMessage={reloadMessage} setReloadMessage={setReloadMessage} setSendMessage={setSendMessage} nombreUsuario={nombreUsuario} />
       </React.Fragment> 
  )
}

  return (
    <div className="App">
      <React.Fragment>
       {visibilityLogin &&  <Login setUsersConected={setUsersConected} numberUsersConected={numberUsersConected} setNumberUsersConected={setNumberUsersConected} nombreUsuario={nombreUsuario} setNombreUsuario={setNombreUsuario} setVisibilityLogin={setVisibilityLogin} setVisibilityHome={setVisibilityHome} />
      }
{visibilityHome && challengeVisibilityForm() }

      </React.Fragment>
      
    </div>
  );
}

export default App;
