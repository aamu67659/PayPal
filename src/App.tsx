import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LoginPage } from './components/LoginPage';
export function App() {
  const [screen, setScreen] = useState<'loading' | 'landing' | 'login'>(
    'loading'
  );
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
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <svg
          className="animate-spin"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animationDuration: '0.8s'
          }}>
          
          <circle
            cx="20"
            cy="20"
            r="17"
            stroke="#E5E7EB"
            strokeWidth="3"
            fill="none" />
          
          <path
            d="M37 20a17 17 0 0 0-17-17"
            stroke="#003087"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none" />
          
        </svg>
      </div>);

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
  return <LoginPage />;
}