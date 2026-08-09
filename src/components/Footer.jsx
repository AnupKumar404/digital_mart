import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white">
      {/* Container to constrain width on ultra-wide screens */}
      <div className="max-w-7xl mx-auto px-2 py-10">
        
        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">

            <div>
                <h1 className="text-4xl font-sans font-bold">DailyVeggies</h1>
                <br />
                <p>Take doorstep delivery of fresh vegetables in Jalandhar City.</p>
            </div>
          
          {/* About Us Section */}
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-2xl tracking-wide">About Us</h3>
                <ul className="flex flex-col gap-2">
                <li>
                    <Link 
                    to="/" 
                    className="hover:text-green-200 transition-colors duration-200"
                    >
                        Home
                    </Link>
                </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-green-200 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-2xl tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-2 text-green-50">
              <li>New Bachint Nagar, Parshuram Nagar</li>
              <li>Jalandhar City, Punjab, 144012</li>
              <li>
                Phone:{" "}
                <a 
                  href="tel:+917986193552" 
                  className="hover:text-white transition-colors duration-200 font-medium"
                >
                  +91 79861-93552
                </a>
              </li>
              <li>Email: anup67904@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t-2 border-green-500 flex justify-center items-center">
          <p className="text-sm text-green-100 text-center">
            &copy; {new Date().getFullYear()} DailyVeggies. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}