import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>(
    'personal'
  );
  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] bg-[#60C6FF] flex flex-col items-center pt-16 px-4 overflow-hidden font-['Inter',sans-serif]">
      {/* Toggle Pill */}
      <div className="flex items-center p-1 border-2 border-gray-900 rounded-full mb-16 bg-transparent z-10">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-6 py-2 rounded-full text-[15px] font-bold transition-all duration-200 ${activeTab === 'personal' ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-black/5'}`}>
          
          Personal
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-6 py-2 rounded-full text-[15px] font-bold transition-all duration-200 ${activeTab === 'business' ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-black/5'}`}>
          
          Business
        </button>
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-black text-gray-900 text-center leading-[1.05] tracking-tight max-w-5xl mb-16 z-10">
        Pay, send, and save smarter
      </h1>

      {/* Phone Mockup */}
      <div className="w-full max-w-[400px] h-[500px] bg-white rounded-t-[3rem] shadow-2xl flex flex-col items-center pt-10 px-6 z-10 relative mt-auto translate-y-12">
        {/* PayPal Text Logo inside mockup */}
        <div className="text-4xl font-black tracking-tighter text-gray-900 mb-8 flex items-center">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#0079C1]">Pal</span>
        </div>

        {/* Navy Blue Screen Area */}
        <div className="w-full flex-1 bg-[#001C64] rounded-t-xl w-[calc(100%+2rem)] -mx-4 relative overflow-hidden">
          {/* Decorative elements to make it look like an app screen */}
          <div className="absolute top-4 left-4 right-4 h-12 bg-white/10 rounded-lg"></div>
          <div className="absolute top-20 left-4 right-4 h-32 bg-white/5 rounded-lg"></div>
        </div>
      </div>

      {/* QR Code Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gray-900 text-white p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform group">
          <div className="border-2 border-white/20 p-1 rounded-xl group-hover:border-white/40 transition-colors">
            <QrCode className="w-12 h-12" strokeWidth={1.5} />
          </div>
        </button>
      </div>
    </section>);

}