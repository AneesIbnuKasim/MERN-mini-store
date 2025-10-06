import React, { useContext } from 'react'
import { ProductContext } from '../contextApi/ProductProvider'

function useProduct() {
  const useProd = useContext(ProductContext)
  return useProd
}

export default useProduct
