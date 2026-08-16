import { add, update, remove } from "../store/CartSlice";
import { MdCurrencyRupee } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { debounce } from 'lodash';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useGetCartItemsQuery, useRemoveCartItemMutation, useUpdateCartMutation } from "../services/cartApi";

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetCartItemsQuery();
  const [updateCartItem] = useUpdateCartMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  // handle state on remove
  const handleRemoveItem = (productId) => {
    dispatch(remove(productId));
    const response = removeCartItem(productId);
    if (response) toast.success("Item removed from cart");
  }

  const handleClicks = (productId, quantity) => {
    handleQuantityChange(productId, quantity);
  }

  // handle quantity change
  const handleQuantityChange = useMemo(() =>
    debounce((productId, newQuantity) => {
      if (newQuantity <= 0) {
        dispatch(remove(productId));
        const response = removeCartItem(productId);
        if (response) toast.success("Item removed from cart");
      } else {
        const response = updateCartItem({ productId, newQuantity });
        if (response) toast.success("Cart updated");
      }
    }, 300),
    [dispatch, removeCartItem, updateCartItem]
  );

  // Calculations for Order Summary
  const subTotal = data?.totalAmount || 0;
  const isFreeShipping = subTotal >= 100;
  const shippingCost = isFreeShipping ? 0 : subTotal * 0.10;
  const finalTotal = subTotal + shippingCost;


  // UX: Handle Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-sans bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600 mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-700">Loading your cart...</h1>
      </div>
    );
  }

  // UX: Handle Error state
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-sans bg-gray-50 px-4 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Couldn't load your cart.</p>
        <button 
          onClick={refetch} 
          className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-full text-white font-bold transition-colors shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  // UX: Handle empty cart state
  if (data?.items?.length === 0 || !data?.items) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="text-gray-400 mb-4 text-7xl md:text-8xl">🛒</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any fresh vegetables to your cart yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-4">
            {data?.items?.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row sm:items-center p-4 md:p-5 bg-white shadow-sm border border-gray-100 rounded-2xl transition-all hover:shadow-md"
              >
                {/* Top Section for Mobile: Image + Title */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.productName}</h3>
                    <p className="flex items-center text-violet-600 font-bold mt-1 text-lg">
                      <MdCurrencyRupee />
                      {item.priceAtAdd.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Bottom Section for Mobile: Quantity + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto">

                  <p>Total Qty: {`${item.unitValue * item.quantity < 1000 ? (item.unitValue * item.quantity +''+item.unitType) : ((item.unitValue * item.quantity) / 1000 +''+'Kg')}`}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-100 rounded-xl border border-gray-200">
                    <button 
                      onClick={() => handleClicks(item.productId, item.quantity - 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black rounded-l-xl transition-colors text-xl font-medium"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleClicks(item.productId, item.quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black rounded-r-xl transition-colors text-xl font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-80 lg:shrink-0">
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-2xl sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Subtotal ({data?.items?.length} items)</span>
                <span className="flex items-center font-medium">
                  <MdCurrencyRupee />{subTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                {isFreeShipping ? (
                  <span className="text-green-600 font-semibold tracking-wide">FREE</span>
                ) : (
                  <span className="flex items-center font-medium">
                    <MdCurrencyRupee />{shippingCost.toFixed(2)}
                  </span>
                )}
              </div>

              {!isFreeShipping && (
                <p className="text-xs text-gray-400 mb-4">
                  Free shipping on orders over <MdCurrencyRupee className="inline mb-0.5"/>100.
                </p>
              )}

              <hr className="my-4 border-gray-200" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="flex items-center text-2xl font-bold text-violet-600">
                  <MdCurrencyRupee />{finalTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:ring-4 focus:ring-violet-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Cart;