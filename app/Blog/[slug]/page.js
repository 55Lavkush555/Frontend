"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Page = () => {
  let params = useParams();
  const [posts, setPosts] = useState([{title: "Heading", content: `<style>
  .cont {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
  }

  .cont pre {
    background: #f4f4f4;
    padding: 15px;
    overflow-x: auto;
    border-radius: 5px;
  }

  .cont code {
    font-family: 'Courier New', Courier, monospace;
    color: #e74c3c;
  }

  .cont ul {
    margin-left: 20px;
  }

  .cont a {
    color: #3498db;
    text-decoration: none;
  }

  .cont a:hover {
    text-decoration: underline;
  }

  .cont .note {
    background: #fffbcc;
    padding: 10px;
    border-left: 5px solid #f1c40f;
    margin: 20px 0;
    border-radius: 5px;
  }
</style>

<div class="cont">
  <h1>How to Integrate MongoDB into Your Next.js Apps</h1>

  <p>Learn how you can easily connect MongoDB to your Next.js applications. This guide covers installation, setup, and
    fetching data.</p>
  <br>

  <h2>1. Install MongoDB Package</h2>
  <pre><code>npm install mongodb</code></pre>
  <br>

  <h2>2. Create MongoDB Connection File</h2>
  <p>Create a <code>lib/mongodb.js</code> file:</p>
  <br>
  <pre><code>import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
</code></pre>
  <br>

  <h2>3. Setup Environment Variables</h2>
  <p>Create a <code>.env.local</code> file:</p>
  <pre><code>MONGO_URI=your_mongo_connection_url</code></pre>
  <br>

  <h2>4. Create API Route</h2>
  <p>Example <code>app/api/blogs/route.js</code>:</p>
  <br>

  <pre><code>import clientPromise from "@/lib/mongodb";
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");
    const blogs = await db.collection("blogs").find({}).toArray();
    return Response.json(blogs);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
</code></pre>
  <br>

  <h2>5. Fetch Blogs in Frontend</h2>
  <p>Example usage in component:</p>
  <br>

  <pre><code>import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    &lt;div&gt;
      &lt;h1&gt;Blogs&lt;/h1&gt;
      {blogs.map((blog) => (
        &lt;div key={blog._id}&gt;
          &lt;h2&gt;{blog.title}&lt;/h2&gt;
          &lt;p&gt;{blog.content}&lt;/p&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}
</code></pre>
  <br>

  <div class="note">
    <strong>Note:</strong> Always sanitize user input and environment variables to keep your app secure!
  </div>

  <p>For more detailed explanation, visit <a
      href="https://www.codewithharry.com/blogpost/how-to-integrate-mongodb-into-your-nextjs-apps"
      target="_blank">CodeWithHarry's Blog</a>.</p>
</div>`}]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://server-backend-u3uc.onrender.com/getBlogs"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto pt-5 max-w-[800px]">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            {post.title === decodeURIComponent(params.slug) && (
              <>
                <img
                  src="/Background.png"
                  alt="Cover"
                  className="w-full h-60 object-cover"
                />
                <div className="relative card my-5 p-4 font-sans w-full">
                  <h1 className="text-3xl font-bold">
                    {decodeURIComponent(params.slug)}
                  </h1>
                  <p className="text-gray-400 text-sm mb-2">
                    {post.date || "No Date Provided"}
                  </p>
                  <div className="text-base font-sans w-full" dangerouslySetInnerHTML={{ __html: post.content }}>
                    
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading blogs...</p>
      )}
    </div>
  );
};

export default Page;
