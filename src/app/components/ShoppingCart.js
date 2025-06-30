'use client'
import { useState } from 'react'

export default function ShoppingCart({ cartItems, removeFromCart }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0)
  
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
              <div className="border-t pt-2 font-bold">
                Total: ${total.toFixed(2)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}