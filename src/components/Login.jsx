import { useRef, useState } from "react";
import { httpClient } from "../configs/HttpClient.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { MdOutlineLock, MdOutlinePerson, MdOutlineRemoveRedEye, MdVisibilityOff } from "react-icons/md";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    passwordHash: "",
  });

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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
    if (!formData.email || !formData.passwordHash) {
      setErrors("Email and password are required fields.");
      return false;
    }
    setErrors("");
    return true;
  };

  // For Login
  const login = async (e) => {
    e.preventDefault(); // Intercepts form submission

    if (inputValidation()) {
      setIsLoading(true);

      try {
        const result = await httpClient.post("/api/v1/auth/login", formData, {
          headers: {
            "content-type": "application/json",
          },
        });

        if (result && result.status === 200) {
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      } catch (error) {
        if (error.status === 401 || error.response) {
          setErrors(error.response?.data?.message || "Invalid credentials.");
        } else {
          setErrors("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300 font-sans py-8">
      
      {/* Card */}
      <div className="w-full max-w-md p-6 sm:p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to access your favourite fresh vegetables
          </p>
        </div>

        {/* Global Error Alert */}
        {errors && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg text-center animate-fade-in">
            {errors}
          </div>
        )}

        <form onSubmit={login} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
                <MdOutlinePerson size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormInput}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
                <MdOutlineLock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="passwordHash"
                value={formData.passwordHash}
                onChange={handleFormInput}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdOutlineRemoveRedEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 flex justify-center items-center text-white font-medium rounded-lg shadow-md transition-colors duration-200 ${
              isLoading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-2 mt-6">
          <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="shrink-0 mx-4 text-gray-400 dark:text-gray-500 text-xs uppercase font-medium tracking-wide">
            Or continue with
          </span>
          <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Google OAuth Button */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;