import React, { useState, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const Review: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

  const user = location.state?.User;
  console.log('Review Page User:', user);

    useEffect(() => {
        if (!user) {
        // if no user found, redirect to login
        navigate('/');
        }
    }, [user, navigate]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 max-w-sm bg-white flex flex-col justify-between p-6 border-r border-gray-200">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img
              src="/logo.png"
              alt="Leverate Logo"
              className="h-6"
            />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
              I
            </div>
            <div>
              <p className="font-medium text-gray-800">IT Leverate</p>
              <p className="text-sm text-gray-500">{user.data.email}</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-gray-400 rounded-full w-1/2"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="bg-black text-white w-full py-3 mt-6 rounded-md font-semibold hover:bg-gray-900 transition">
          <span className="mr-2">↩</span> Sign Out
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Leverate Group Asia Performance Review
        </p>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/bg-particles.png')] bg-cover bg-center opacity-50"></div>

        <div className="relative z-10 w-full max-w-lg px-8">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-700 rounded-full mb-6">
            <div className="h-1 bg-cyan-400 rounded-full w-1/5"></div>
          </div>

          <div className="bg-[#0a0f1a] bg-opacity-80 rounded-lg p-6 shadow-lg">
            <p className="text-cyan-400 text-sm font-semibold mb-1">REVIEWEE SELECTION</p>
            <h2 className="text-xl font-bold mb-4">
              <span className="text-cyan-400">1 → </span> Select Reviewee
            </h2>

            {/* Select Box */}
            <select
            //   value={selectedReviewee}
            //   onChange={(e) => setSelectedReviewee(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select an option...</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>

            {/* OK Button */}
            <div className="flex justify-end mt-6">
              <button className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-md font-semibold flex items-center gap-2">
                OK <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Review;