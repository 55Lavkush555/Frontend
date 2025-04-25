"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown"

export default function Home() {

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
    <div className="container mx-auto min-h-[95vh]">

      <div className="about my-10 flex flex-col-reverse md:flex-row gap-5 items-center w-full md:border-[1px] border-black rounded-lg md:shadow-lg p-5">

        <div className="contant w-full md:w-2/3 felx flex-col justify-center items-center md:px-10">
          <h1 className="font-bold text-3xl">Hi, I am Lavkush,</h1>

          <p className="text-[20px]">Hello, I am a full stack web-developer and a Python programmer. I can create your modern and responsive websites and fix bugs in your existing website. I can scrip the web using python for you.</p>

          <button className="text-2xl bg-red-600 rounded-full px-2 sm:px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer">Hire me</button>

          <Link href={"/Work"}><button className="text-2xl bg-red-600 rounded-full px-2 sm:px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer">My projects</button></Link>

        </div>

        <div className="md:w-1/3 w-full flex justify-center">
          <img className="w-3xs contain rounded-2xl" src="profile_pic.webp" alt="" />
        </div>
      </div>

      <hr />

      <div className="featured-work my-2.5">
        <h1 className="text-2xl text-center font-bold">Featured work</h1>

        <div className="card-container flex justify-around items-center flex-wrap">

          <div className="card w-60 flex flex-col gap-1 border-[1px] border-black rounded-lg shadow-lg p-5 m-5">
            <img className="w-56 h-28 object-cover rounded-[10px]" src="Spotify_clone.png" alt="Spotify clone img" />
            <h2 className="text-2xl">Spotify clone</h2>
            <p className="h-[72px] overflow-auto">It is a clone of official Spotify website. It is created using HTML, CSS and JavaScript.</p>
            <button className="text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit"><Link href={"https://github.com/55Lavkush555/Spotify-clone"}>See</Link></button>
          </div>

          <div className="card w-60 flex flex-col gap-1 border-[1px] border-black rounded-lg shadow-lg p-5 m-5">
            <img className="w-56 h-28 object-cover rounded-[10px]" src="Jarvis.jpeg" alt="Spotify clone img" />
            <h2 className="text-2xl">Jarvis</h2>
            <p className="h-[72px] overflow-auto">Jarvis is an voice assistant which is created using python. It can take voice command and done the work.</p>
            <button className="text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit"><Link href={"https://github.com/55Lavkush555/Jarvis"}>See</Link></button>
          </div>

          <div className="card w-60 flex flex-col gap-1 border-[1px] border-black rounded-lg shadow-lg p-5 m-5">
            <img className="w-56 h-28 object-cover rounded-[10px]" src="Netflix_clone.png" alt="Spotify clone img" />
            <h2 className="text-2xl">Netflix clone</h2>
            <p className="h-[72px] overflow-auto">It is a clone of netflix official website which is created usin HTML and CSS.</p>
            <button className="text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit"><Link href={"https://github.com/55Lavkush555/netflix_clone.github.io"}>See</Link></button>
          </div>

        </div>
      </div>

      <hr />

      <div className="recent-post my-2.5">
        <h1 className="text-2xl text-center font-bold">Recent post</h1>

        <div className="md:bg-sky-300 w-full rounded-2xl py-5 mt-2">
          <div className="post w-full md:w-2/3 mx-auto bg-white rounded-2xl shadow-lg p-5 border-2 border-black">

            {posts.length > 0 ? (
              <div>
                <h1 className="text-2xl">{posts[posts.length - 1].title}</h1>
                <p className="text-gray-600">{posts[posts.length - 1].date}</p>
                <div><ReactMarkdown>{posts[posts.length - 1].content}</ReactMarkdown></div>
                <div className="w-full flex justify-end">
                  <Link href={"/Blog"}><button className="text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 focus:bg-red-700 hover:bg-red-700 cursor-pointer w-fit">See all</button></Link>
                </div>
              </div>
            ) : (
              <p className='text-center text-gray-500'>Loading blog...</p>
            )}


          </div>
        </div>
      </div>

    </div>
  );
}
