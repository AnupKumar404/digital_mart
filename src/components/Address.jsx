import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { MdApartment, MdHome, MdLocationCity, MdLocationPin, MdOutlineLocationCity } from "react-icons/md";
import { httpClient } from "../configs/HttpClient";

function NewAddress() {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    type: "",
  });

  const [error, setError] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (
      formData.city === "" ||
      formData.state === "" ||
      formData.addressLine1 === "" ||
      formData.addressLine2 === "" ||
      formData.pinCode === "" ||
      formData.type === ""
    ) {
      setError("All fields are required..");
      return false;
    }

    return true;
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload = async (e) => {
    setError([]);

    if (validateForm()) {
      e.preventDefault();

      try {
        const response = await httpClient.post("/api/v1/addresses", formData, {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        });

        if (response.status === 201) {
          toast.success(response.data);
        }
      } catch (err) {
        err.status === 400 ? setError(err.response.data.message) : navigate('/login');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      {/* Card: Added dark mode background and border */}
      <div className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="text-center">
          {/* Text: Adjusted heading and subtitle for dark mode */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            New Address
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Add additional new address
          </p>
        </div>


        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              addressLine1
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdHome size={20} />
              </div>
              {/* Input: Added dark background, text, borders, and placeholder colors */}
              <input
                type="text"
                name="addressLine1"
                id="addressLine1"
                value={formData.addressLine1}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="addressLine1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              addressLine2
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdHome size={20} />
              </div>
              {/* Input: Added dark background, text, borders, and placeholder colors */}
              <input
                type="text"
                name="addressLine2"
                id="addressLine2"
                value={formData.addressLine2}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="addressLine2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              city
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdLocationCity size={20} />
              </div>
              {/* Input: Added dark background, text, borders, and placeholder colors */}
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="Enter your city"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              state
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineLocationCity size={20} />
              </div>
              {/* Input: Same dark mode updates as username */}
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="state"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter pincode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdLocationPin size={20} />
              </div>
              {/* Input: Added dark background, text, borders, and placeholder colors */}
              <input
                type="text"
                name="pinCode"
                id="pinCode"
                value={formData.pinCode}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="pincode"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address Type
            </label>
            <div className="relative flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdApartment size={20} />
              </div>
              {/* Input: Added dark background, text, borders, and placeholder colors */}
              <select
                type="text"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                required
              >
                <option value="">--select an option--</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            onClick={payload}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Add
          </button>

          {error && <p className="text-red-500 text-xl text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default NewAddress;
