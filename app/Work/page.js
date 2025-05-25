import React from 'react'
import Card from './Card'

const Work = () => {
    return (
        <div className='container mx-auto py-3.5'>
            <Card head={"iChat | Chat app"} body={"iChat is a chat app in which you can simplify login with your name and you can chat in group. It is created using Tailwindcss, Mongodb and Next.js it is fully responsive and good-looking."} img_link={"/IMG_20250525_080915.jpg"} project_link={"https://chat-app-wqpr.vercel.app/"} />
        
            <Card head={"iPass | Password Manager"} body={"iPass is a password manager which can save your passwords to your browsers local storage and it is also responsive in desine. It is created using React and Tailwindcss."} img_link={"/Password-Manager.png"} project_link={"https://password-manager-9uxh.onrender.com/"} />

            <Card head={"Netflix Clone"} body={"It is a clone of the official website of Netflix. It is created using HTML and CSS. It can look similar like Netflix website. And it is responsive"} img_link={"/Netflix_clone.png"} project_link={"https://github.com/55Lavkush555/netflix_clone.github.io"} />

            <Card head={"Spotify Clone"} body={"It is a clone of the official website of Spotify. It is created using HTML, CSS and JavaScript. In this you can play songs and it is fully responsive."} img_link={"/Spotify_clone.png"} project_link={"https://github.com/55Lavkush555/Spotify-clone"} />

            <Card head={"Jarvis"} body={"Jarvis is an voice assistant which is created using Python. It can take your voice command and done the tasks."} img_link={"/Jarvis.jpeg"} project_link={"https://github.com/55Lavkush555/Jarvis"} />

            <Card head={"Space-War"} body={"Space-War is a game it is created using python and pygame library. In this you can soot the enmys space-ships."} img_link={"/Space-War.png"} project_link={"https://github.com/55Lavkush555/Space-War-game"} />

            <Card head={"Calculator"} body={"It is a Calculator and it is created using python and tkinter."} img_link={"/calculator.png"} project_link={"https://github.com/55Lavkush555/Calculator"} />

            <Card head={"Car-Animation"} body={"It is an animation of a moving car on a track. It is created using HTML, CSS and JavaScript."} img_link={"/Car-Animation.jpeg"} project_link={"https://github.com/55Lavkush555/Car-animation-"} />

            <Card head={"Car-Game"} body={"It is a game created using python and pygame. In this game you need to protect your car from another cars."} img_link={"/Car-game.png"} project_link={"https://github.com/55Lavkush555/Car-Game"} />

            <Card head={"Pyter"} body={"Pyter is an advance code editor for python created using python and tkinter. It includes code suggetions and many more."} img_link={"/code-editor.png"} project_link={"https://github.com/55Lavkush555/Pyter"} />

            <Card head={"Responsive Calculator"} body={"It is an morden calculator created using python and kivy. It is responsive."} img_link={"/res-calculator.png"} project_link={"https://github.com/55Lavkush555/Responsive-calculator"} />

            <Card head={"Sooting-Game"} body={"Sooting game is a bird sooting game which is created using python and pygame. In this game you can soot the birds."} img_link={"/sooting-game.png"} project_link={"https://github.com/55Lavkush555/Sooting-game"} />

        </div>
    )
}

export default Work
