import React, { useState, useEffect } from "react";
import "./Main.css";
import { Link } from "react-router-dom";

export const Main = () => {
  const [libros, setLibros] = useState([]);
  const [carrito, setCarrito] = useState({});
  const [contador, setContador] = useState(0);
  const [carritoVisible, setCarritoVisible] = useState(false);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const response = await fetch("http://localhost:3000/harryBooks");
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener los libros", error);
      }
    };
    obtenerLibros();
  }, []);

  const agregarAlCarrito = (libro) => {
    const cantidadEnCarrito = carrito[libro.id_libro] || 0;
    if (cantidadEnCarrito < libro.cantidad) {
      const nuevoCarrito = { ...carrito };
      nuevoCarrito[libro.id_libro] = (nuevoCarrito[libro.id_libro] || 0) + 1;
      console.log("se agrega el libro");
      console.log(libro);
      setCarrito(nuevoCarrito);
      setContador(contador + 1);
    }
  };

  const quitarDelCarrito = (libro) => {
    const cantidadEnCarrito = carrito[libro.id_libro] || 0;
    if (cantidadEnCarrito > 0) {
      const nuevoCarrito = { ...carrito };
      nuevoCarrito[libro.id_libro] = cantidadEnCarrito - 1;
      setCarrito(nuevoCarrito);
      setContador(contador - 1);
    }
  };

  return (
    <main className="principal1">
      {carritoVisible && (
        <div className="carrito-compras">
          <h2 className="titulo">Carrito de Compras</h2>
          <div className="tabla">
            <h4>Libros</h4>
            <h4>Cantidad</h4>
            <h4>Valor Unitario</h4>
            <h4>Valor Total</h4>
          </div>

          <div className="btns">
            <button className="btn-car">cancelar la compra</button>
            <button className="btn-car">confirmar la compra</button>
          </div>
        </div>
      )}
      <div className="principal">
        <h3 className="h31">Libros Disponibles</h3>
        <Link
          // to="/carrito"
          // state={{ carrito }}
          className="btn-car"
          onClick={() => setCarritoVisible(!carritoVisible)}
        >
          {carritoVisible ? "Ocultar Carrito" : "Ir al carrito de compras"}({contador})
        </Link>

        {/* <button onClick={confirmarCompra}>Confirmar Compra</button> */}
      </div>

      <div>
        <ul>
          {libros.map((libro) => (
            <li key={libro.id_libro}>
              <h2>{libro.titulo_libro}</h2>
              <img src={libro.imagen} alt={libro.titulo_libro} />
              <p>Precio: ${libro.precio_libro}</p>
              <p>Cantidad Disponible: {libro.cantidad}</p>
              <div className="add">
                <button className="btn" onClick={() => quitarDelCarrito(libro)}>
                  -
                </button>
                <span className="contador">{carrito[libro.id_libro] || 0}</span>
                <button className="btn" onClick={() => agregarAlCarrito(libro)}>
                  +
                </button>
              </div>
              {carrito[libro.id_libro] >= libro.cantidad && (
                <p className="agotado">Cantidad agotada</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
