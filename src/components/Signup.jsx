
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { MdArrowForward, MdOutlinePerson, MdOutlineLock, MdPhone, MdTransgender } from "react-icons/md";
import { httpClient } from "../configs/HttpClient";

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    passwordHash: "",
    gender: "",
    phoneNumber: 0,
  });

  const [error, setError] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();




  const validateForm = () => {

    if (formData.email === "" || formData.passwordHash === "" || formData.firstname === "" || formData.lastname === "" || formData.gender === "" || formData.phoneNumber.toString().length < 10)
    {

      toast.error("All fields are required..");
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

  const signup = async (e) => {
    setError([]);

    if (validateForm()) {
      e.preventDefault();

      try {
        const response = await httpClient.post("/api/v1/users", formData, {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: false
        });

        if (response.status === 201) {
          toast.success(response.data);
          navigate('/login');
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        }
      }
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
        {/* Card: Added dark mode background and border */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="text-center">
            {/* Text: Adjusted heading and subtitle for dark mode */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Sign Up/Register
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign up to create new account
            </p>
          </div>

      <form className="space-y-4">

         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Firstname
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlinePerson size={20} />
            </div>
            {/* Input: Added dark background, text, borders, and placeholder colors */}
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="firstname"
              required
            />
          </div>
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lastname
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlinePerson size={20} />
            </div>
            {/* Input: Added dark background, text, borders, and placeholder colors */}
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="lastname"
              required
            />
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlinePerson size={20} />
            </div>
            {/* Input: Added dark background, text, borders, and placeholder colors */}
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineLock size={20} />
            </div>
            {/* Input: Same dark mode updates as username */}
            <input
              type="password"
              name="passwordHash"
              id="passwordHash"
              value={formData.passwordHash}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Gender
          </label>
          <div className="relative flex gap-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdTransgender size={20} />
            </div>
            {/* Input: Added dark background, text, borders, and placeholder colors */}
            <select
              type="text"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="Male, Female etc."
              required
            >
                <option value="">--select an option--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
          </div>
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdPhone size={20} />
            </div>
            {/* Input: Added dark background, text, borders, and placeholder colors */}
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormInput}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="phone number"
              required
            />
          </div>
        </div>



        <button
          type="submit"
          onClick={signup}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      <Link to='/login' className="text-blue-500 text-xl flex justify-center-safe">Sign in ?</Link>
    </div>

    </div>

  );
}

export default Signup;
