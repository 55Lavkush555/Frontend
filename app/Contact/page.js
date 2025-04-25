"use client"
import React from 'react'
import { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submiting, setSubmiting] = useState(false)

  async function submitForm() {
    setSubmiting(true)
    let r = await fetch("https://server-backend-u3uc.onrender.com/addMessage", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              name: name,
              email: email,
              message: message
          })
      })

    setEmail('')
    setName('')
    setMessage('')
    setSubmiting(false)
  }



  return (
    <div className='container mx-auto flex justify-center py-10 min-h-[92vh] items-center'>

      <div className="message-box border-2 h-fit border-gray-300 p-3 md:p-8 rounded-lg shadow-lg w-fit flex flex-col items-center">

        <h1 className='text-4xl font-bold'>Contact</h1>

        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your Name' className='w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5' />

        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email address' className='focus:border-red-500 w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5' />

        <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name="Message" id="message" placeholder='Message' className='h-52 w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5'></textarea>

        {submiting == false && (
        <button onClick={submitForm} className='text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 hover:bg-red-700 cursor-pointer'>Send</button>
        )}
        {submiting && <span className='text-gray-500'>Sending...</span>}
      </div>
    </div>
  )
}

export default Contact
