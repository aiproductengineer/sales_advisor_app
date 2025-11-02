import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Login: React.FC = () => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }

    const success = login(pin);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid PIN. Try 123456 for demo.');
      setPin('');
    }
  };

  const handlePinInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 6) {
      setPin(numericValue);
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden max-w-full">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-1/4 -translate-x-1/2 w-72 h-72 bg-luxury-gold/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-luxury-darkGold rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative glass-card p-6 rounded-full">
              <Lock className="w-16 h-16 text-luxury-gold" />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold mt-6 mb-2">
            <span className="text-gradient-gold text-glow">Ethos</span>
          </h1>
          <p className="text-xl text-gray-400 font-light">Sales Advisor</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-luxury-gold/70">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Luxury Retail Excellence</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-300 mb-3">
                Enter 6-Digit PIN
              </label>
              <div className="relative">
                <input
                  id="pin"
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value)}
                  className="input pr-12 text-center text-2xl tracking-[0.5em] font-light"
                  placeholder="••••••"
                  autoFocus
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-luxury-gold transition-colors"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-xl">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={pin.length !== 6}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none py-4 text-lg font-semibold relative overflow-hidden group"
            >
              <span className="relative z-10">Unlock</span>
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                Demo PIN: <span className="font-mono font-semibold text-luxury-gold">123456</span>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Lock className="w-3 h-3" />
                <span>Biometric authentication in production</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Need help? Contact your store manager
        </p>
      </div>
    </div>
  );
};
