import { useState } from 'react'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import {Carrito} from './components/Carrito/Carrito'
import {Routes, Route } from 'react-router'

function App() {
  return (
    <>
    <Header />
    <Routes> 
      <Route path="/" element={<Main />} /> 
      <Route path="/Carrito" element={<Carrito />} />
    </Routes>

    </>
  )
}

export default App
