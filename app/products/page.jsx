"use client"; // Client Component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Icons


// Fetch products with pagination
async function fetchProducts(page = 1) {
  const skip = (page - 1) * 20; // Skip for pagination
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// Image Carousel Component
function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Display current image */}
      <img src={images[currentImageIndex]} alt="Product" className="h-40 w-full object-contain rounded-t-lg mb-4" />

      {/* Display controls if more than one image */}
      {images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
            onClick={handlePrevious}
          >
            ‹
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
            onClick={handleNext}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true); // Start loading
        const productData = await fetchProducts(currentPage); // Fetch products
        setProducts(productData); // Store products in state
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
    loadProducts();
  }, [currentPage]);

  const updatePageInURL = (newPage) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage); // Update ?page= in URL
    window.history.pushState({}, "", url);
  };

  const handlePageChange = (newPage) => {
    updatePageInURL(newPage);
    setLoading(true); // Set loading state
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
            {/* Image Carousel */}
            <ImageCarousel images={product.images} />

            {/* Product Details */}
            <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>

            {/* Action Buttons */}
            <div className="flex justify-between text-md items-center mt-4 space-x-2">
              {/* Add to Cart Button */}
              <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Heart Icon */}
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                <FaHeart />
              </button>

              {/* View Details Button */}
              <a href={`/products/${product.id}`} className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          disabled={currentPage === 1} // Disable when on first page
          onClick={() => handlePageChange(currentPage - 1)}
          className={`bg-orange-500 text-white px-4 py-2 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Next
        </button>
      </div>
    </div>
  );
}


