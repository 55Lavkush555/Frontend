import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='container mx-auto py-4 text-center max-[420px]:flex-col-reverse bg-[#ebebeb] rounded-2xl flex justify-around items-center'>
      <span>Copyright &copy; 2025. All rights reserved.</span>

      <div className='flex gap-1.5 items-center'>
        <Link href={"https://github.com/55lavkush555"}><img className='w-8' src="/github-mark.svg" alt="Github" /></Link>
        <Link href={"https://www.linkedin.com/in/lavkush-kushwaha-205850340/"}><img className='w-10' src="/LinkedIn.svg" alt="LinkedIn" /></Link>
      </div>
    </footer>
  )
}

export default Footer
