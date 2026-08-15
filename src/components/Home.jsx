import { useEffect, useState } from "react";
import { httpClient } from "../configs/HttpClient.js";
import { useNavigate } from "react-router";
import { add } from "../store/CartSlice.js";
import { useDispatch } from 'react-redux';
import { MdCurrencyRupee } from 'react-icons/md';
import { useAddToCartMutation } from "../services/cartApi.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCart] = useAddToCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await httpClient.get("/api/v1/products", {
          withCredentials: false,
        });

        if (response && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Fixed: Changed [true] to [] to run only on mount

  // handle add to cart button
  const handleCart = (item) => {
    dispatch(add(item));
    addToCart(item);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans min-h-screen">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Fresh Vegetables</h1>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden group"
          >
            {/* Image Container */}
            <div 
              onClick={() => navigate(`/${product.name}/${product.id}`)}
              className="aspect-square bg-gray-50 overflow-hidden cursor-pointer relative"
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1">
              <h3 
                onClick={() => navigate(`/${product.name}/${product.id}`)}
                className="text-gray-800 font-medium text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-green-600 transition-colors"
              >
                {product.name}
              </h3>

              <span className="text-sm text-gray-600 mt-4">
                {parseFloat(product.unitValue).toString() +' '+ product.unitType} 
              </span>
              
              {/* Footer: Price & Button (mt-auto forces this to the bottom) */}
              <div className="mt-auto pt-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3">
                <span className="flex items-center text-lg font-bold text-gray-900">
                  <MdCurrencyRupee className="text-gray-600" />
                  {product.price}
                </span>
                
                <button 
                  onClick={() => handleCart(product)} 
                  className="w-full xl:w-auto bg-green-50 hover:bg-green-500 text-green-600 hover:text-white border border-green-200 font-medium text-sm rounded-xl px-4 py-2 transition-colors duration-200 shadow-sm"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Fallback */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🥬</div>
          <p className="text-xl text-gray-500 font-medium">No products available right now.</p>
        </div>
      )}
      
    </main>
  );
}

export default Home;