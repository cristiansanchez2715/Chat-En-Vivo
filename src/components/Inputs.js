import React from 'react'
import { useState } from 'react'


function Inputs({setReceiveMessage, receiveMessage, chatContainerRef, sendMessage, reloadMessage ,setReloadMessage, nombreUsuario, setSendMessage}) {
  const [texto, setTexto] = useState(null)
  const [error, setError] = useState(null)
const [valueText, setValueText] = useState("")

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  

const challengeText = (e) => {
  
    setTexto(e.target.value)
}

const submitForm = (e) => {
e.preventDefault()
if(texto.length > 0){
    setReloadMessage(false)
setSendMessage({user: nombreUsuario, message: texto || ""})
setReceiveMessage(true)
setTimeout(() => {
    scrollToBottom();
  }, 150);

if(reloadMessage = false){
    setTimeout(() => setReloadMessage(true), 100) 

}
} else {
    setError("Escriba un texto en el mensaje porfavor")
}
}
  
    return (


    <div className='inputs-container'>
        <div>
        <h1>Bienvenido Al Chat En Linea</h1>
        </div>
        <form onSubmit={submitForm} className='form-sendmessage'>
<h1>Usuario: {nombreUsuario}</h1>            
<textarea  className='input-messsage' onChange={challengeText} placeholder='Escribe el contenido de tu mensaje' />
<button className='btn btn-send' type='submit'>Enviar</button>
{error && <div>
    <h1 className='error'>{error}</h1></div>}
        </form>
    </div>
  )
}

export default Inputs