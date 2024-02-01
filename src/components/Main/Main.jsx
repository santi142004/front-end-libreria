import React, { useState, useEffect } from "react";
import "./Main.css";

export const Main = () => {
  const [libros, setLibros] = useState([]);
  const [carrito, setCarrito] = useState({});
  const [carritoSeleccionado, setCarritoSeleccionado] = useState([]);
  const [contador, setContador] = useState(0);
  const [carritoVisible, setCarritoVisible] = useState(false);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const response = await fetch("https://harrybooks.onrender.com");
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        setLibros(data); // Actualiza el estado libros con la respuesta del servidor.
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
      setCarrito(nuevoCarrito);
      setContador(contador + 1);

      // Verificar si el libro ya está en carritoSeleccionado
      const libroIndex = carritoSeleccionado.findIndex(
        (item) => item.titulo === libro.titulo_libro
      );

      if (libroIndex !== -1) {
        const carritoSeleccionadoActualizado = [...carritoSeleccionado];
        carritoSeleccionadoActualizado[libroIndex].cantidad += 1;
        setCarritoSeleccionado(carritoSeleccionadoActualizado);
      } else {
        // Agregar el libro al carritoSeleccionado
        const libroSeleccionado = {
          titulo: libro.titulo_libro,
          cantidad: cantidadEnCarrito + 1,
          precio: libro.precio_libro,
        };
        setCarritoSeleccionado([...carritoSeleccionado, libroSeleccionado]);
      }
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

          {carritoSeleccionado.map((item, index) => (
            <div key={index} className="carrito-item">
              <span className="items">{item.titulo}</span>
              <span className="items">{item.cantidad}</span>
              <span className="items">${item.precio}</span>
              <span className="items">${item.cantidad * item.precio}</span>
            </div>
          ))}

          <div className="btns">
            <button className="btn-car">cancelar la compra</button>
            <button className="btn-car">confirmar la compra</button>
          </div>
        </div>
      )}
      <div className="principal">
        <h3 className="h31">Libros Disponibles</h3>
        <button
          className="btn-car"
          onClick={() => setCarritoVisible(!carritoVisible)}
        >
          {carritoVisible ? "Ocultar Carrito" : "Ir al carrito de compras"}(
          {contador})
        </button>
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
