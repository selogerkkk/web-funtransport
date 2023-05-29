'use client'

import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  model: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  async function loadRentals() {
    try {
      const response = await api.get('/products')

      setProducts(response.data)
    } catch (err) {
      // tratar erros
    }
  }

  useEffect(() => {
    loadRentals()
  }, [])
  return (
    <main className="">
      <h1>Produtos</h1>

      <ul>
        {products.map((product) => {
          return <li key={product.id}>{product.model}</li>
        })}
      </ul>
    </main>
  )
}
