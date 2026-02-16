import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "./api/axios";

const SignUpForm = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    if (!formData.username || !formData.email || !formData.password) {
      console.log("missing fields")
      return;
    }
    try {
      const res = await API.post('/api/auth/register', {
        username: formData.username,
         email: formData.email,
          password: formData.password
      });
      navigate('/login');

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg mx-auto">
        <div
          className={`fixed top-5 left-7 text-3xl font-extrabold transition-all z-30
          ${"text-[#EAEAEA] drop-shadow-[0_0_2px_rgba(255,255,255,0.09)]"}`}
        >
          SafeYatra
        </div>

        <h1 className="text-2xl font-bold text-white text-center">Create an account</h1>
        <p className="text-gray-400 text-center mb-6">Join us by signing up</p>

        {/* Name Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Full Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            className="p-2 w-93 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Sign Up'}
        </button>

        {/* Already have an account? */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? <a onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer">Log In</a>
        </p>
      </form>

    </div>
  );
};

export default SignUpForm;