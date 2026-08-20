import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ServerCrash, RefreshCw, Home, LifeBuoy, ChevronDown, AlertCircle } from 'lucide-react';

const ServerError = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);

    navigate('/properties');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Visual Graphic Element */}
        <div className="relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-extrabold text-rose-900/10 select-none tracking-widest">
            500
          </h1>
        </div>

        {/* Text Heading & Explanation */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Something went wrong
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our server encountered an internal error or misconfiguration and was unable to complete your request. We've been notified and are looking into it.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            disabled={isRefreshing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-700 text-white font-medium text-sm hover:bg-blue-800 transition shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Retrying...' : 'Try again'}
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 hover:text-gray-900 transition shadow-sm cursor-pointer"
          >
            <Home size={18} />
            Back to homepage
          </Link>
        </div>

        {/* Helpful Support Links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>If the problem persists, please contact our team.</p>
          <Link
            to="/support"
            className="inline-flex items-center gap-1 text-blue-700 font-medium hover:underline"
          >
            <LifeBuoy size={14} />
            Contact Customer Support
          </Link>
        </div>

      </div>
    </main>
  );
};

export default ServerError;