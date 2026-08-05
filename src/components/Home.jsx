import { useEffect, useState } from "react";
import { httpClient } from "../configs/HttpClient.js";
import { Link } from "react-router";
import { add, remove } from "../store/CartSlice.js";
import {useDispatch} from 'react-redux'
import { MdAccountCircle, MdOutlineLocalGroceryStore, MdCurrencyRupee } from 'react-icons/md'
import Navbar from "./Navbar.jsx";
import { addToCart } from "../store/CartSlice.js";
import { useAddToCartMutation } from "../services/cartApi.js";

function Home() {
  const [products, setProducts] = useState([])
  const [addToCart] = useAddToCartMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await httpClient.get("/api/v1/products", {
        withCredentials: false,
      });

      if (response) {
        setProducts(response.data);
        console.log(response.data);
      }
    };

    fetchProducts();
  }, [true]);


  // handle add to cart button

  const handleCart = (item) => {
    dispatch(add(item))
    addToCart(item)
    console.log(item)
  }

  return (
    <>

          <main className="rounded-lg shadow-md grid px-30 py-10 grid-cols-1 md:grid-cols-10 gap-x-50">
            {products.map((product) => (
              <div className="card p-4 text-xl font-serif w-fit border-white bg-amber-50 rounded-xl" key={product.id}>
                <img src={product.imageUrl} width="200" height="100" alt={product.name} />

                <p className="text-sm mt-5">{product.name}</p>

                <div className="flex gap-x-5 mt-5">
                   
                  <span className="flex"><MdCurrencyRupee className="mt-1.5"/> {product.price}</span>
                  <button onClick={() => handleCart(product)} className="bg-green-50 text-sm cursor-pointer text-green-500 shadow rounded-xl px-5 py-1.5 border">
                    ADD
                  </button>
                </div>
                
              </div>
            ))}
          </main>
    </>
  );
}

export default Home;
