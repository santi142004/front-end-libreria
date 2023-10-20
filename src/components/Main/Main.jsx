import React, { useState, useEffect } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

export const Main = () => {
  const [libros, setLibros] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const response = await fetch('http://localhost:3000/harryBooks');
        if (!response.ok) {
          throw new Error('Error al obtener los libros');
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.error('Error al obtener los libros', error);
      }
    };
    obtenerLibros();
  }, []);

  const agregarAlCarrito = (libro) => {
    const cantidadEnCarrito = carrito.filter((item) => item.id === libro.id).length;
    if (cantidadEnCarrito < libro.cantidad) {
      setCarrito([...carrito, libro]);
      setContador(contador + 1);
    }
  };

  const quitarDelCarrito = (libro) => {
    const libroIndex = carrito.findIndex((item) => item.id === libro.id);
    if (libroIndex !== -1) {
      const newCarrito = [...carrito];
      newCarrito.splice(libroIndex, 1);
      setCarrito(newCarrito);
      setContador(contador - 1);
    }
  };

  return (
    <main className="principal1">
      <div className="principal">
        <h3>Libros Disponibles</h3>
        <Link
          to="/carrito"
          state={{ carrito }}
          className="btn-car"
        >
          Ir al carrito de compras ({contador})
        </Link>
      </div>

      <div>
        <ul>
          {libros.map((libro) => (
            <li key={libro.id}>
              <h2>{libro.titulo}</h2>
              <img src={libro.imagen} alt={libro.titulo} />
              <p>Precio: ${libro.precio}</p>
              <p>Cantidad Disponible: {libro.cantidad}</p>
              <div className='add'>
                <button className='btn' onClick={() => quitarDelCarrito(libro)}>-</button>
                <span className='contador'>{carrito.filter((item) => item.id === libro.id).length}</span>
                <button className='btn' onClick={() => agregarAlCarrito(libro)}>+</button>
              </div>
              {carrito.filter((item) => item.id === libro.id).length >= libro.cantidad && (
                <p className='agotado'>Cantidad agotada</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

