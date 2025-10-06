
import Navbar from './components/Navbar'
import Products from './pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

function App() {


  return (
    <>
    <ErrorBoundary>
      
    <Navbar/>
    <Routes>
      <Route path='/products' element={<Products/>} />
    </Routes>

    </ErrorBoundary>
    
    </>
  )
}

export default App
