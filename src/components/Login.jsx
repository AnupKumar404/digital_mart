import { useRef, useState } from "react";
import { httpClient } from "../configs/HttpClient.js";
import toast from "react-hot-toast";
import { Navigate, useNavigate, Link } from "react-router";
import { MdLock, MdOutlineLock, MdOutlinePerson, MdOutlineRemoveRedEye } from "react-icons/md";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    passwordHash: "",
  });

  const [errors, setErrors] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  
  const abortControllerRef = useRef(null);

  const navigate = useNavigate();



  // For Handling Form Input of Login

  const handleFormInput = (e) => {

    setErrors("");
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // For Input Validation

  const inputValidation = () => {
    if (formData.email === "" || formData.passwordHash === "") {
      setErrors("email and password are required fields");
      return false;
    }

    setErrors("");
    return true;
  };



  if (isLoading) {
    return <h1 className="text-center font-semibold">Loading....</h1>;
  }

  // For Login

  const login = async (e) => {
    e.preventDefault();

    if (inputValidation()) {
      setIsLoading(true);

      try {
        const result = await httpClient.post("/api/v1/auth/login", formData, {
          headers: {
            "content-type": "application/json",
          },
        });

        if (result && result.status == 200) {
          toast.success(result.data);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      } catch (error) {
        if (error.status == 401) {
          setErrors(error.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      
        {/* Card: Added dark mode background and border */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">

          <div className="text-center">
            {/* Text: Adjusted heading and subtitle for dark mode */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to access your favourite products
            </p>
          </div>

          <form className="space-y-4">
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
                  type="email"
                  name="email"
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
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdOutlineLock size={20} />
                </div>
                {/* Input: Same dark mode updates as username */}
                <input
                  type="password"
                  name="passwordHash"
                  value={formData.passwordHash}
                  onChange={handleFormInput}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />

              </div>
            </div>

            <button
              type="submit"
              onClick={login}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
            >
              Login
            </button>
          </form>

          {errors && <p className="text-red-500 text-center justify-center text-xl">{errors}</p>}

          {/* Divider: Dark mode borders and text */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="shrink-0 mx-4 text-gray-400 dark:text-gray-500 text-xs uppercase font-medium tracking-wide">
              Or continue with
            </span>
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          <div className="space-y-3">
            {/* Google Button: Adapted for dark mode background and text */}
            <button className="w-full flex items-center justify-center py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Google
              </span>
            </button>
          </div>

          <div className="flex justify-center gap-x-2">
              <h3>Don't have an account ?</h3>
              <Link to='/signup' className="text-blue-500 text-shadow-2xs flex justify-end-safe">Signup</Link>
          </div>

        </div>
      </div>
  
    </>
  );
}

export default Login;
