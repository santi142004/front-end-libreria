import {React,useState, useEffect} from 'react'
import './Main.css'
export const Main = () => {

  const [libros, setLibros]= useState([])

  useEffect(() =>{
    const obtenerLibros= async () =>{
      try{
        const response = await fetch('http://localhost:3000/harryBooks')
        if (!response.ok) {
          throw new Error('Error al obtener los libros')
        }
        const data = await response.json()
        setLibros(data)
      }catch(error){
        console.error('Error al obtener los libros', error)
      }
    }
    obtenerLibros()
  }, [])

  return (
    <main className='principal1'>
    <div className='principal'>
      <h3>Libros Disponibles </h3>
      <a href='/Carrito' className='btn-car'>Ir al carrito de compras</a>
    </div>
    
    <div>
      <ul>
        {libros.map(libro =>(
          <li key={libro.id}>
            <h2>{libro.titulo}</h2>
            <img src={libro.imagen} alt={libro.titulo} />
            <p>Precio: ${libro.precio}</p>
            <p>Cantidad Disponible: {libro.cantidad}</p>
          </li>
        ))}
      </ul>
    </div>
    </main>
  )
}
