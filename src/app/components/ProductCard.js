'use client'

export default function ProductCard({ name, description, price, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart({ name, description, price })
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart - ${price}
      </button>
    </div>
  )
}