import React, { useState } from 'react';
import Button from '../components/ui/Button';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (email === '') {
            setMessage('Please enter your email.');
        } else {
          const res = await api.post('/login', { email });
          setTimeout(() => {
            setLoading(false);
            navigate('/review', { state: { User: res.data } });
          }, 1000);
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
        
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar - 30% */}
      <div className="w-[30%] bg-white p-8 flex flex-col justify-between">
        <div>
          <img src="/logo.png" alt="INSIGHT Logo" className="mb-8 max-w-32" />
          <div className="space-y-3">
            <h1 className="text-2xl text-black font-semibold">Performance Review</h1>
            <p className="text-sm text-gray-700 opacity-80">
              Sign in with your Google account to access your performance
              review.
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 opacity-60">
          <p>Leverate Group Asia Performance Review</p>
        </div>
      </div>

      {/* Main Content - 70% */}
      <div className="w-[70%] flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome</h2>
            <p className="text-muted-foreground">
              Please sign in to continue with your performance review
            </p>
          </div>

            <div className="space-y-4 flex flex-col">
              <div className='flex flex-row gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3
                      w-full
                      px-6 py-4
                      border border-gray-300
                      rounded-xl
                      bg-transparent
                      text-white
                      transition-all duration-300
                      focus-within:ring-2 focus-within:ring-blue-500'>
                    <input
                      type="email"
                      placeholder="your email"
                      className="
                      w-full bg-transparent outline-none
                      text-base font-medium
                      placeholder-white
                      "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </div>
                <div className='flex-2'>
                  <Button
                      onClick={handleSubmit}
                      disabled={loading}
                    size="lg"
                    className="w-full flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-white text-lg">Please wait...</p>
                      </div>
                    ) : (
                      loading ? "Signing in..." : "Continue with Email"
                    )}
                    
                  </Button>
                </div>
              </div>

            <p className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our terms of service and privacy
              policy.
              </p>
              {message && <p className="text-sm text-gray-300 mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;