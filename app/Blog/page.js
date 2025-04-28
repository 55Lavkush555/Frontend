"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Blog = () => {
  const [search, setSearch] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  const [searchReselt, setSearchReselt] = useState(0)
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

  const handleSearch = () => {
    setIsSearch(true)
  }


  return (
    <div className='container mx-auto pt-5'>
      <div className="search flex gap-1.5 items-center flex-wrap justify-center">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setSearchReselt(0) }} type="text" placeholder='Type to search' className='border-2 rounded-full px-1.5 focus:border-red-600' />
        <button className='text-[20px] bg-red-600 rounded-full px-5 text-white focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit' onClick={handleSearch}>Search</button>
      </div>

      {posts.length > 0 && isSearch == false ? (
        posts.map((post, index) => (
          <div key={index} className="relative card my-5 p-4 border border-gray-300 rounded-xl shadow-md font-sans max-h-48 overflow-hidden">
            <h1 className='text-2xl font-semibold'>{post.title}</h1>
            <p className='text-gray-400 text-sm mb-2'>{post.date || 'No Date Provided'}</p>
            <pre className='text-base font-sans' dangerouslySetInnerHTML={{ __html: post.content }}>
            </pre>
            <Link href={`/Blog/${post.title}`} className='absolute bottom-1 right-0'><button className='text-[20px] bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit'>Read</button></Link>
          </div>
        ))
      ) : (
        <>
          {isSearch == false && (
            <p className='text-center text-gray-500'>Loading blogs...</p>
          )}
        </>
      )}

      {isSearch && (
        <>
          <h2 className='text-2xl text-gray-500'>Search Reasult for "{search}"</h2>
          {posts.map((post, index) => (
            <div key={index}>
              {post.title.toLowerCase().includes(search) && (
                <div className="relative card my-5 p-4 border border-gray-300 rounded-xl shadow-md font-sans max-h-48 overflow-hidden">
                  <h1 className='text-2xl font-semibold'>{post.title}</h1>
                  <p className='text-gray-400 text-sm mb-2'>{post.date || 'No Date Provided'}</p>
                  <pre className='text-base font-sans' dangerouslySetInnerHTML={{ __html: post.content }}>
                  </pre>
                  <Link href={`/Blog/${post.title}`} className='absolute bottom-1 right-0'><button className='text-[20px] bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit'>Read</button></Link>
                </div>
              )}
            </div>
          ))}
        </>
      )}

    </div>
  )
}

export default Blog
