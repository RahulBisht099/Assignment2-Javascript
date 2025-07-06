import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1624953187665-7d41d0ade16e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxtb25leXxlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-xl text-center">
          <h1 className="text-4xl font-extrabold text-black mb-4">
            Smart Expense Tracker💸
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Take control of your finances. Set budgets, track spending, and stay organized — all in one simple app.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded transition duration-200"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
