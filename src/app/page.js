'use client'
import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import ShoppingCart from './components/ShoppingCart'
import { supabase } from './supabase'

export default function Home() {
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch products from Supabase
 useEffect(() => {
  async function fetchProducts() {
    console.log('Attempting to fetch products...')
    const { data, error } = await supabase
      .from('products')
      .select('*')
    
    console.log('Supabase response:', { data, error })
    
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      console.log('Products fetched successfully:', data)
      setProducts(data)
    }
    setLoading(false)
  }
  
  fetchProducts()
}, [])
  
  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }
  
  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="text-xl">Loading products...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          My E-commerce Store
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}