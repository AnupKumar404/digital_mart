import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useGetProductByIdQuery, useAddToCartMutation } from '../services/cartApi';
import { MdCurrencyRupee, MdOutlineCheckCircleOutline, MdOutlinePunchClock } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { add } from '../store/CartSlice';

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  
  // Fetch product data from your API
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const [addToCart] = useAddToCartMutation();

  // Track selections for groceries (Weight and Type instead of Size and Color)
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
          <div className="text-lg font-medium text-green-600 animate-pulse">Loading fresh veggie...</div>
        </div>
      </div>
    );
  }

  // 2. Handle Error State
  if (error || !product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
        <div className="text-5xl mb-4">🥬</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't load the details for this item.</p>
        <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
          Back to Store
        </Link>
      </div>
    );
  }

  // 3. Extract data with safe fallbacks suitable for vegetables
  const mainImage = product.imageUrl || null;
  const title = product.name || product.title;
  const price = product.price.toFixed(2);
  const description = product.description;

  // Grocery specific variations
  const weights = product.weights || ['250g', '500g', '1kg', '2kg'];
  const types = product.types || ['Standard', '100% Organic'];

  // Determine active selections
  const activeWeight = selectedWeight || weights[1]; // Default to 500g
  const activeType = selectedType || types[0];

  // Handle add to cart
  const handleAddToCart = (product) => {
    // In a real app, you might want to attach the selected weight/type to the payload
    const productWithSelections = {
      ...product,
      selectedWeight: activeWeight,
      selectedType: activeType,
    };
    dispatch(add(productWithSelections));
    addToCart(productWithSelections);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6 md:mb-8 overflow-hidden">
          <ol className="flex items-center space-x-2 whitespace-nowrap">
            <li><Link to="/" className="hover:text-green-600 transition-colors font-medium">Home</Link></li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">
              {title}
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* Single Main Image */}
          <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-6 sm:p-8">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={title} 
                className="object-contain object-center w-full h-full mix-blend-multiply hover:scale-105 transition-transform duration-300" 
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-green-300">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-8 px-2 sm:px-0 lg:mt-0 flex flex-col justify-center">
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {title}
            </h1>

            <div className="mt-4 flex items-center">
              <p className="text-3xl sm:text-4xl flex items-center font-bold text-green-700">
                <MdCurrencyRupee className="mr-0.5 text-2xl sm:text-3xl text-gray-600" />
                {price}
              </p>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Description</h3>
              <p className="text-base text-gray-600 leading-relaxed">{description}</p>
            </div>

            <div className="mt-8 space-y-8">
              
              {/* Farming Type (Standard vs Organic) */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Cultivation Type</h3>
                <div className="flex flex-wrap gap-3">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] border focus:outline-none ${
                        activeType === type
                          ? 'bg-green-50 border-green-600 text-green-700 ring-1 ring-green-600'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Options */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Select Quantity</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {weights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`flex items-center justify-center px-3 py-3 border rounded-xl text-sm font-medium transition-all active:scale-[0.98] focus:outline-none ${
                        activeWeight === weight
                          ? 'bg-green-600 border-green-600 text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base sm:text-lg font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
              
              {/* Grocery Specific Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-start">
                  <div className="shrink-0 mt-0.5">
                    <MdOutlineCheckCircleOutline className="text-green-600" size={24} />
                  </div>
                  <p className="ml-3 text-sm text-gray-600 font-medium">100% Freshness Guarantee</p>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 mt-0.5">
                    <MdOutlinePunchClock className="text-green-600" size={24} />
                  </div>
                  <p className="ml-3 text-sm text-gray-600 font-medium">Same-day delivery available</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}