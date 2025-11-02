import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
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
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 6) {
      setPin(numericValue);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Ethos Sales Advisor
          </h1>
          <p className="text-primary-100">
            Enter your PIN to continue
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit PIN
              </label>
              <div className="relative">
                <input
                  id="pin"
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value)}
                  className="input pr-12 text-center text-2xl tracking-widest"
                  placeholder="••••••"
                  autoFocus
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pin.length !== 6}
              className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Unlock
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Demo PIN: <span className="font-mono font-semibold">123456</span>
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              Protected by biometric authentication in production
            </p>
          </div>
        </div>

        <p className="text-center text-primary-100 text-sm mt-6">
          Need help? Contact your store manager
        </p>
      </div>
    </div>
  );
};
