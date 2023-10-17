import React from 'react'
import './Carrito.css'
export const Carrito = () => {
  return (
    <>
    <h2>Carrito de Compras</h2>
    <div className='tabla'>
      <h4>Libros</h4>
      <h4>Cantidad</h4>
      <h4>Valor Unitario</h4>
      <h4>Valor Total</h4>
    </div>
    <div className='btns'>
      <button className='btn-car'>cancelar la compra</button>
      <button className='btn-car'>confirmar la compra</button>
    </div>
    </>
  )
}
