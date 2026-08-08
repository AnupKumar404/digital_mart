import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useGetProductByIdQuery, useAddToCartMutation } from '../services/cartApi';
import { MdCheck, MdCurrencyRupee, MdOutlineCheckCircleOutline, MdOutlineLockClock, MdOutlinePunchClock } from 'react-icons/md';
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
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-xl font-medium text-green-600 animate-pulse">Loading fresh veggie...</div>
      </div>
    );
  }

  // 2. Handle Error State
  if (error || !product) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-xl font-medium text-red-500">Failed to load product details.</div>
      </div>
    );
  }

  // 3. Extract data with safe fallbacks suitable for vegetables
  const mainImage = product.imageUrl || null;
  const title = product.name || product.title;
  const price = product.price.toFixed(2)
  const description = product.description;

  // Grocery specific variations
  const weights = product.weights || ['250g', '500g', '1kg', '2kg'];
  const types = product.types || ['Standard', '100% Organic'];

  // Determine active selections
  const activeWeight = selectedWeight || weights[1]; // Default to 500g
  const activeType = selectedType || types[0];


  // Handle add to cart
  const handleAddToCart = (product) => {
        
        dispatch(add(product));
        addToCart(product);

  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-green-600 transition-colors">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-medium truncate sm:max-w-xs">
              {title}
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* Single Main Image */}
          <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-8">
            {mainImage ? (
              <img src={mainImage} alt={title} className="object-contain object-center rounded-4xl w-full h-full mix-blend-multiply" />
            ) : (
              <div className="flex flex-col items-center justify-center text-green-300">
                <svg className="w-24 h-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{title}</h1>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl flex font-bold text-gray-900"><MdCurrencyRupee className='mt-1' />{price}</p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="font-bold text-3xl">Description:</h3>
              <p className="text-base text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="mt-8">
              {/* Farming Type (Standard vs Organic) */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Cultivation Type</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border focus:outline-none ${
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
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Select Weight/Quantity</h3>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {weights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`flex items-center justify-center px-3 py-3 border rounded-xl text-sm font-medium transition-colors focus:outline-none ${
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
              <div className="mt-10 flex gap-4">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-green-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
              

              {/* Grocery Specific Perks */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8">

                <div className="flex items-start">
                  <MdOutlineCheckCircleOutline color='green' size={25} />
                  <p className="ml-3 text-sm text-gray-500">100% Freshness Guarantee</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-">
                    
                  </div>
                  <p className="ml-3 text-sm text-gray-500">Same-day delivery available</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}