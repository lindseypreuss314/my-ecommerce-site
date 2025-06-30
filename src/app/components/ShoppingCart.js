'use client'
import { useState } from 'react'

export default function ShoppingCart({ cartItems, removeFromCart }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0)
  
  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems
        }),
      })
      
      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }
  
  return (
    <div className="fixed top-4 right-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white px-4 py-2 rounded shadow-lg"
      >
        Cart ({cartItems.length})
      </button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white border rounded shadow-lg p-4 w-64">
          <h3 className="font-bold mb-2">Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-bold mb-4">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? 'Loading...' : 'Checkout with Stripe'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}