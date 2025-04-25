"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const Host = () => {
    const params = useParams();

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [content, setContent] = useState("")
    const [submiting, setSubmiting] = useState(false)

    async function submitForm() {
        setSubmiting(true)
        let r = await fetch("https://server-backend-u3uc.onrender.com/addBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                date: date,
                content: content
            })
        })

        setTitle('')
        setDate('')
        setContent('')
        setSubmiting(false)
    }

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://server-backend-u3uc.onrender.com/getMessages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, [])

    return (
        <div>
            {params.password == "lavkush6269121509" && <div className='container mx-auto flex flex-col justify-center items-center'>

                <h1 className='text-3xl font-bold my-5 bg-red-600 text-white px-5 rounded-full inline'>Welcome Lavkush!</h1>

                <div className="content-box border-2 h-fit border-gray-300 p-3 md:p-8 rounded-lg shadow-lg w-fit flex flex-col items-center">
                    <h1 className='text-4xl font-bold'>Add Blog</h1>

                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder='Blog Title' className='w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5' />

                    <input value={date} onChange={(e) => { setDate(e.target.value) }} type="text" placeholder='Date' className='focus:border-red-500 w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5' />

                    <textarea value={content} onChange={(e) => { setContent(e.target.value) }} name="content" id="content" placeholder='Write the Blog' className='h-52 w-72 px-5 py-2 border-[1px] border-gray-500 rounded-[5px] my-2.5'></textarea>

                    {submiting == false && (
                        <button onClick={submitForm} className='text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 hover:bg-red-700 cursor-pointer'>Post</button>
                    )}
                    {submiting && <span className='text-gray-500'>Posting...</span>}
                </div>

                <div className="w-full bg-gray-500 my-5"><hr /></div>

                <div className="card my-5 p-2 md:px-32">
                    {messages.length > 0 ? (
                        messages.map((messages, index) => (
                            <div key={index} className="card my-5 p-4 border border-gray-300 rounded-xl shadow-md">
                                <h1 className='text-2xl text-center'>{messages.name}</h1>
                                <p className='text-gray-400 text-center'>{messages.email}</p>
                                <p className='text-center'>{messages.message}</p>  
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>Loading Messages...</p>
                    )}


                </div>

            </div>}

            {params.password != "lavkush6269121509" && <div className='container mx-auto min-h-[90vh] flex justify-center items-center'>
                <span className='text-3xl text-red-600 font-bold'>Wrong Password</span>
            </div>}
        </div>
    )
}

export default Host
