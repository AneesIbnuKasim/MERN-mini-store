
import Navbar from './components/Navbar'
import Products from './pages/Products'
import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import AddProduct from './pages/AddProduct'

function App() {


  return (
    <>
    <ErrorBoundary>
      
    <Navbar/>
    <Routes>
      <Route path='/' element={<Products/>} />
      <Route path='/add-product' element={<AddProduct />} />
    </Routes>

    </ErrorBoundary>
    
    </>
  )
}

export default App
