import { Link } from "react-router";
import { 
  FaLeaf, 
  FaLocationDot, 
  FaPhone, 
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter
} from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-950 text-white pt-16 pb-6 mt-12 border-t-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit group">
              <FaLeaf className="text-3xl text-green-400 group-hover:rotate-12 transition-transform duration-300" />
              <h1 className="text-3xl font-sans font-extrabold tracking-tight">DailyVeggies</h1>
            </Link>
            <p className="text-green-200/80 leading-relaxed max-w-sm mt-2">
              Take doorstep delivery of fresh, organic, and handpicked vegetables in Jalandhar City. Eating healthy has never been easier.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:-translate-y-1 transition-all duration-300">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/er.__anup__pb08/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:-translate-y-1 transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:-translate-y-1 transition-all duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="font-bold text-xl tracking-wide text-green-400">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="group flex items-center text-green-100 hover:text-white transition-colors duration-200 w-fit">
                  <MdKeyboardArrowRight className="text-green-500 text-xl group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center text-green-100 hover:text-white transition-colors duration-200 w-fit">
                  <MdKeyboardArrowRight className="text-green-500 text-xl group-hover:translate-x-1 transition-transform duration-200" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="group flex items-center text-green-100 hover:text-white transition-colors duration-200 w-fit">
                  <MdKeyboardArrowRight className="text-green-500 text-xl group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Shop Veggies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h3 className="font-bold text-xl tracking-wide text-green-400">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-green-100">
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-green-400 mt-1 flex-shrink-0" />
                <span className="leading-tight">
                  New Bachint Nagar, Parshuram Nagar<br />
                  Jalandhar City, Punjab, 144012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+917986193552" 
                  className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 font-medium"
                >
                  +91 79861-93552
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:anup67904@gmail.com" 
                  className="hover:text-white hover:underline underline-offset-4 transition-all duration-200"
                >
                  anup67904@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-green-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-300">
          <p>&copy; {new Date().getFullYear()} DailyVeggies. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}