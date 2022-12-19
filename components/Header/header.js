import React from 'react'
import Image from "next/image"
import style from "./header.module.css"
import logo from "./customer-logo3.png"
const Header = () => {
  return (
    <nav className={style.mainHeader}>
        <div className='logo'><Image src={logo}></Image></div>
        <a href='#section1'>HOW IT WORKS</a>
        <a href='#section2'>FOR INDIVIDUALS</a>
        <a href='#section3'>FOR BUSINESS</a>
        <a href='#section4'>WHY MONTWAY</a>
        <a href='#section5'>HELP</a>
    </nav>
  )
}

export default Header