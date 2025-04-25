"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'

const Blog = () => {
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
          <div key={index} className="relative card my-5 p-4 border border-gray-300 rounded-xl shadow-md font-sans max-h-36 overflow-hidden">
            <h1 className='text-2xl font-semibold'>{post.title}</h1>
            <p className='text-gray-400 text-sm mb-2'>{post.date || 'No Date Provided'}</p>
            <pre className='text-base font-sans'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </pre>
            <Link href={`/Blog/${post.title}`} className='absolute bottom-1 right-0'><button className='text-[20px] bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit'>Read</button></Link>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>Loading blogs...</p>
      )}
    </div>
  )
}

export default Blog
