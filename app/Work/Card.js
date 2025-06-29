"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({head, body, img_link, project_link}) => {
    return (
        <div className="card flex flex-col items-center mt-5 card my-5 p-4 sm:border border-gray-400 rounded-xl shadow-md">
            <Image className='object-cover border-2' src={img_link} alt='' width={450} height={300} loading='lazy' />
            <h1 className="text-2xl font-bold py-1.5">{head}</h1>
            <p className='px-3.5 text-[17.5px]'>{body}</p>
            <div className="btn w-full px-3.5 flex justify-center items-center">
                <Link href={project_link}><button className='text-2xl bg-red-600 rounded-full px-5 mr-2.5 text-white mt-2.5 hover:bg-red-700 cursor-pointer'>See</button></Link>
            </div>
        </div>
    )
}

export default Card
