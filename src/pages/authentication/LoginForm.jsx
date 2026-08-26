
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Building2, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '', // Can be Email or Phone
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData)
      console.log(response);
      
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleToRegister = () => {
    navigate('/register', {
      state: {
        from: from
      }
    })
  }

  const handleBackBtn = () => {
    navigate(from, {replace: true})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Brand Showcase */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-slate-900 text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')` }} 
          />
          <div className="relative z-10 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold tracking-wide">Grand Luxe Stay</span>
          </div>
          
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl font-extrabold leading-tight">Welcome back to Hotel.</h2>
            <p className="text-slate-300 text-sm">
              Manage your reservations, view exclusive rewards, and check in with ease.
            </p>
          </div>

          <div className="relative z-10 text-xs text-slate-400">
            © 2026 Choem Vannin. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="relative p-8 sm:p-12 flex flex-col justify-center">
          {/* back button */}
          <button 
          onClick={handleBackBtn}
          className='absolute z-50 text-black right-6 top-6'>
            <X size={24} />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sign In to Your Account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier Field (Email or Phone) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Email or phone
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="identifier"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="guest@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase">Password</label>
                <a href="#forgot" className="text-xs text-blue-600 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-[0.99] mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Router Link to Register */}
          <div onClick={handleToRegister} className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button className="text-blue-600 font-semibold hover:underline">
              Register now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
