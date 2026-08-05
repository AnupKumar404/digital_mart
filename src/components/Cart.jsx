
import { add, update, remove, addToCart } from "../store/CartSlice";
import {MdCurrencyRupee} from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import {debounce} from 'lodash';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useGetCartItemsQuery, useRemoveCartItemMutation, useUpdateCartMutation } from "../services/cartApi";

export function Cart() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data, isLoading, isError, refetch } = useGetCartItemsQuery();
  const [updateCartItem] = useUpdateCartMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  // handle state on remove

  const handleRemoveItem = (productId) => {
      dispatch(remove(productId))

      const response = removeCartItem(productId);

      console.log(response)
  
      if(response) toast.success(response.data)
      
  }

  const handleClicks = (productId, quantity) => {
        const newQuantity = quantity;
        handleQuantityChange(productId, newQuantity);
  }


  // handle quantity change

  const handleQuantityChange = useMemo(() => 
    debounce((productId, newQuantity) => {

      if(newQuantity <= 0){
        dispatch(remove(productId))
        const response = removeCartItem(productId)
  
        if(response) toast.success(response.data)
      }
      else{
        const response = updateCartItem({productId, newQuantity});

        if(response) toast.success(response.data)
      }
    }, 300),
    []
  )


  // UX: Handle empty cart state
  if (data?.items?.length === 0) {

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-gray-400 mb-4 text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }


  if(isError){
    return (
      <div className="flex flex-col justify-center items-center h-screen font-serif">
        <p className="text-4xl font-bold mb-6">Couldn't load your cart.</p>
        <button onClick={refetch} className="bg-blue-500 px-6 py-1 text-2xl cursor-pointer rounded-xl text-white font-bold">Retry</button>
      </div>
    )
  }



  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen font-serif">
        <h1>Loading....</h1>
      </div>
    )
  }


  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart 🛒</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-4">
            {data?.items?.map((item) => (
              <div 
                key={item.productId} 
                className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white shadow-sm border border-gray-100 rounded-2xl"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink- bg-gray-100 rounded-xl overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                  <p className="flex text-violet-600 font-bold mt-1"><MdCurrencyRupee className="mt-1.5" />{item.priceAtAdd.toFixed(2)}</p>
                </div>

                <div className="flex px-6 py-2 bg-green-600 rounded-xl text-white text-xl gap-x-3">
                  <button onClick={() => handleClicks(item.productId, item.quantity-1)}>-</button>
                 <span>{item.quantity}</span>
                 <button onClick={() => handleClicks(item.productId, item.quantity+1)}>+</button>
                </div>

                
                {/* Actions */}
                <button 
                  onClick={() => handleRemoveItem(item.productId)} 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-">
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-2xl sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Subtotal ({data?.items?.length} items)</span>
                <span className="flex"><MdCurrencyRupee className="mt-1.5" />{data?.totalAmount?.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span className="text-green-600">{data?.totalAmount >= 100 ? 'FREE' : data?.totalAmount * (10/100)}</span>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="flex text-2xl font-bold text-violet-600">
                  <MdCurrencyRupee className="mt-1.5" />{data?.totalAmount >= 100 ? data?.totalAmount.toFixed(2) : (data?.totalAmount.toFixed(2) + (data?.totalAmount * (10/100)))}
                </span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
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