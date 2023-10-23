import React from 'react'
import './Header.css'
import img from '../../../public/logo.png'
export const Header = () => {
  return (
    <header>
      <img className='logo' src={img} alt='logo' />
    <h1>Harry Books -Tienda Online</h1>
    </header>
  )
}
