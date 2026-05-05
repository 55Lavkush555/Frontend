"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ChatbotIcon = () => {
    const pathname = usePathname();
    if (pathname === "/chatbot") return null;
    return (
        <Link href="/chatbot"className='bg-gray-500 rounded-full cursor-pointer fixed p-2 bottom-10 right-5'>
            <img src={'/chatbot-icon.png'} alt='Chatbot icon' className='w-12 h-12'></img>
        </Link>
    )
}

export default ChatbotIcon