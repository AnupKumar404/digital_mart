import { MdAccountCircle, MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { cartApi } from "../services/cartApi";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart)
  const totalValue = items.reduce((sum, item) => {return sum + item.price}, 0)

  const handleCartClick = () => {
    dispatch(cartApi.util.prefetch('getCartItems', undefined, {force: true}))
    navigate('/cart');
  }

  return (
    <div className="bg-white p-4 border-2 border-gray-200">
      <nav className="flex justify-between">

        <div className="flex mt-3 text-3xl font-bold font-serif">
          <h1 className=" text-black">
             Daily
          </h1>
          <h1 className="text-green-700">
            Veggies
          </h1>
        </div>

        <div className="flex text-2xl bg-gray-200 px-2 gap-x-2 rounded-xl">
            <label htmlFor=""><MdSearch className="mt-5" size={30}/></label>
            <input className="w-150 bg-transparent border-none outline-hidden ring-0" type="text" placeholder="Search 'Aalu' " />
        </div>

        <div className="text-2xl p-3 mt-1.5 text-shadow-black hover:bg-gray-100">
            <Link to="/login">Login</Link>
        </div>
        
        <div className="gap-x-6 flex text-2xl text-shadow-black">
          <div className="flex p-3 gap-x-6 mt-1.5 hover:bg-gray-100">
            
            <Link to="/" title="home">Home</Link>
            <Link to="/about" title="about">About</Link>
             <Link to="/profile" title="user profile">
                <MdAccountCircle size={40} />
            </Link>
          </div>

          <div className="flex items-center bg-violet-600 hover:bg-violet-800 text-white rounded-xl py-1 px-5">
            {items?.length === 0 ? <button className="cursor-not-allowed" title="cart"><MdOutlineShoppingCart size={25} /></button>
            : <button className="cursor-pointer" onClick={handleCartClick}><MdOutlineShoppingCart size={25} /></button>}
              <p className="text-xl">{items.length} item</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
