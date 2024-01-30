
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route exact path="/" element={<Main />} /> 
    </Routes>

    </>
  )
}

export default App
