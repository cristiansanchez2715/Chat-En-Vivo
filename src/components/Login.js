import React, { useEffect } from 'react'
import { useState } from 'react'


function Login({setUsersConected, numberUsersConected, setNumberUsersConected, nombreUsuario, setNombreUsuario, setVisibilityHome, setVisibilityLogin}) {
const [error, setError] = useState(null)
let [actualizedApp, setActualizedApp] = useState(0)

const usersConectedAddFunction = async () => {
    try {
      const response = await fetch("http://localhost:4000/userContainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to connect. Status: ${response.status}`);
      }

      const data = await response.json();

      setNumberUsersConected(data.numberUsersConnected);
      setUsersConected(data.usersConnected);
    } catch (error) {
      console.error(error);
      setError("Error al conectar. Inténtalo de nuevo.");
    }
  };


  useEffect(() => {
   
    const timeoutId = setTimeout(() => {
      usersConectedAddFunction();
    }, 1000);

   
    return () => clearTimeout(timeoutId);
  }, [actualizedApp]);



const usersConectedFunction = () => {
   
  
    setActualizedApp(actualizedApp += 1)
    // addUserConected()
}

const challengeInput = (e) => {
e.preventDefault()
    setNombreUsuario(e.target.value)
    
}

const challengeStates = () => {
    setVisibilityLogin(false)
    setVisibilityHome(true)
    usersConectedFunction()
}

const submitForm = (e) => {
    e.preventDefault()
nombreUsuario.length > 0 ? challengeStates() : setError("Debe Introducir Un Nombre En El Campo")
usersConectedFunction()
}


  return (
    <form onSubmit={submitForm} className='form-login'>
   <div className='content-form-container'>
   <label>Nombre Usuario</label>
   <input className='input-form' onChange={challengeInput} type='text' placeholder='Nombre'></input>
   </div>
<button className='btn-login' type='submit'>Ingresar</button>
{error && 
    <div><h1 className='error'>{error} </h1></div>
}
    </form>
  )
}

export default Login