import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Compass, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Visual Graphic Element */}
        <div className="relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-extrabold text-blue-900/10 select-none tracking-widest">
            404
          </h1>
        </div>

        {/* Text Area */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Page not found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 hover:text-gray-900 transition shadow-sm cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-700 text-white font-medium text-sm hover:bg-blue-800 transition shadow-md hover:shadow-lg cursor-pointer"
          >
            <Home size={18} />
            Back to homepage
          </Link>
        </div>

        {/* Secondary Helpful Links Grid */}
        <div className="pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          <Link
            to="/properties"
            className="group p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition">
              <Search size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-700 transition">
                Browse Rooms
              </h3>
              <p className="text-xs text-gray-500">
                Explore available stays in Phnom Penh
              </p>
            </div>
          </Link>

          <Link
            to="/support"
            className="group p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-700 transition">
                Help & Support
              </h3>
              <p className="text-xs text-gray-500">
                Get assistance from our team
              </p>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NotFound;