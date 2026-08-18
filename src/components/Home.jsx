import { useEffect, useState } from "react";
import { httpClient } from "../configs/HttpClient.js";
import { useNavigate } from "react-router";
import { add } from "../store/CartSlice.js";
import { useDispatch } from "react-redux";
import { MdCurrencyRupee } from "react-icons/md";
import { useAddToCartMutation } from "../services/cartApi.js";
import { FaLeaf, FaTruckFast, FaPercent, FaArrowRight } from "react-icons/fa6";

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
  }, []);

  const handleCart = (item) => {
    dispatch(add(item));
    addToCart(item);
  };

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans min-h-screen">
      
      {/* Informative Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-teal-800 text-white shadow-xl mb-12">
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Banner Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <FaPercent className="text-emerald-300" /> Weekend Special &bull; Up to 25% Off
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight leading-tight">
              Farm Fresh Veggies, At Your Doorstep 🚪 <br className="hidden sm:inline" />
              <span className="text-emerald-300">Delivered in 30 Mins.</span>
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base max-w-lg leading-relaxed">
              Harvested daily from local organic farms and brought straight to your kitchen table with peak freshness and zero preservatives guaranteed.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToProducts}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 group text-sm sm:text-base"
              >
                Shop Fresh Now
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
              
              <span className="text-xs text-emerald-200">
                Use code <strong className="text-white underline underline-offset-2">FRESH25</strong> at checkout
              </span>
            </div>
          </div>

          {/* Quick Value Propositions Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/30 rounded-xl text-emerald-300 text-lg">
                <FaLeaf />
              </div>
              <div>
                <h4 className="font-semibold text-sm">100% Organically Grown</h4>
                <p className="text-xs text-emerald-200">Directly sourced, chemical-free produce</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/30 rounded-xl text-emerald-300 text-lg">
                <FaTruckFast />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Express Delivery</h4>
                <p className="text-xs text-emerald-200">Free delivery on orders over ₹99</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <div id="products-section" className="flex justify-between items-center mb-8 scroll-mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Fresh Vegetables</h2>
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
                {parseFloat(product.unitValue).toString() + " " + product.unitType} 
              </span>
              
              {/* Footer: Price & Button */}
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