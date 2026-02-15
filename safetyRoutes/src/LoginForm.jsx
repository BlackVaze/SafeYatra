import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate('/LandingPage2');
        setInput({ email: '', password: '' });
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300 p-4`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full p-0.5 ${isDarkMode ? 'bg-gray-600' : 'bg-blue-400'} transition-colors duration-300`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
              isDarkMode ? '' : 'translate-x-6'
            }`}
          />
        </button>
      </div>

      <div className={`w-full max-w-md mt-20 ${isDarkMode ? 'bg-black' : 'bg-white'} p-6 rounded-lg shadow-lg mx-auto transition-colors duration-300`}>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>Welcome back!</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-6`}>Enter your credentials to access your account</p>

        <form onSubmit={loginHandler}>
          <div className="flex flex-col mb-3">
            <label className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Email address</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className={`p-2 rounded-md ${isDarkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border outline-none`}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1 flex justify-between`}>
              Password <a href="#" className="text-blue-400 text-sm">Forgot password?</a>
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
              className={`p-2 rounded-md ${isDarkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border outline-none`}
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm text-center mt-4`}>
          Don't have an account? <a href="/signup" className="text-blue-400">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;