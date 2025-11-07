import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#F9BD2B] to-[#FFA500] rounded-lg flex items-center justify-center font-bold text-black">
                  P
                </div>
                <span className="text-xl font-bold text-gray-900">PostHog</span>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#F9BD2B]" />
                  <span className="text-lg font-semibold text-[#F9BD2B]">Cortex Engine</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className={`transition-colors ${
                    isActive('/') 
                      ? 'text-[#F9BD2B] hover:text-[#FFA500] font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/revenue">
                <Button 
                  variant="ghost" 
                  className={`transition-colors ${
                    isActive('/revenue') 
                      ? 'text-[#F9BD2B] hover:text-[#FFA500] font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Revenue
                </Button>
              </Link>
              <Link to="/costs">
                <Button 
                  variant="ghost" 
                  className={`transition-colors ${
                    isActive('/costs') 
                      ? 'text-[#F9BD2B] hover:text-[#FFA500] font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Costs
                </Button>
              </Link>
              <Link to="/funnels">
                <Button 
                  variant="ghost" 
                  className={`transition-colors ${
                    isActive('/funnels') 
                      ? 'text-[#F9BD2B] hover:text-[#FFA500] font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Funnels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
