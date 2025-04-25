"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'

const page = () => {
    let params = useParams()
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://server-backend-u3uc.onrender.com/getBlogs');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, [])

    return (
        <div className='container mx-auto pt-5'>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        {post.title === decodeURIComponent(params.slug) && <>
                            <img src="/Background.png" alt="Cover" className='w-full h-60 object-cover' />
                            <div className="relative card my-5 p-4 font-sans w-full">
                                <h1 className='text-3xl font-bold'>{decodeURIComponent(params.slug)}</h1>
                                <p className='text-gray-400 text-sm mb-2'>{post.date || 'No Date Provided'}</p>
                                <div className='text-base font-sans w-full'>
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>
                            </div></>}
                    </div>

                ))
            ) : (
                <p className='text-center text-gray-500'>Loading blogs...</p>
            )}
        </div>
    )
}

export default page
