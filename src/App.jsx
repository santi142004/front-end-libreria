
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import {Carrito} from './components/Carrito/Carrito'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route exact path="/" element={<Main />} /> 
      <Route path="/carrito" element={<Carrito />} />
    </Routes>

    </>
  )
}

export default App
