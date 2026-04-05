import { CreditCard, List, MessageSquare, Phone, Mail, Pencil } from 'lucide-react';

interface VerificationPageProps {
  email: string;
  onBack: () => void;
}

export function VerificationPage({ email, onBack }: VerificationPageProps) {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center font-['Inter',sans-serif]">
      {/* Top Email Bar */}
      <div className="w-full max-w-[480px] mt-8 px-4">
        <div className="bg-[#f5f7fa] rounded-full px-6 py-3 flex items-center justify-between border border-gray-100">
          <span className="text-[15px] text-gray-700 truncate mr-2">{email}</span>
          <button 
            onClick={onBack}
            className="text-[#0070BA] font-bold text-[15px] hover:underline shrink-0"
          >
            Change
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[480px] px-8 pt-12 pb-20 flex flex-col items-center">
        {/* PayPal Logo */}
        <div className="mb-8 self-start">
          <svg
            viewBox="0 0 200 200"
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z"
              fill="#003087" />
            <path
              d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z"
              fill="#0079C1" />
          </svg>
        </div>

        <h1 className="text-[32px] font-bold text-gray-900 leading-tight mb-12 self-start tracking-tight">
          Choose how to continue
        </h1>

        {/* Options List */}
        <div className="w-full space-y-8 mb-12">
          <Option 
            icon={<CreditCard className="w-6 h-6 text-gray-700" />} 
            label="Confirm your credit card number" 
          />
          <Option 
            icon={<List className="w-6 h-6 text-gray-700" />} 
            label="Answer your security questions" 
          />
          <Option 
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-3.5-3.5 1.41-1.41L11 14.67l6.59-6.59L19 9.5l-8 8z" />
              </svg>
            } 
            label="Use the PayPal app" 
          />
          <Option 
            icon={<MessageSquare className="w-6 h-6 text-gray-700" />} 
            label="Get a text" 
          />
          
          {/* Have us call you - Selected State */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full group cursor-pointer">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-900" />
                <span className="text-[17px] font-medium text-gray-900">Have us call you</span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center p-1">
                <div className="w-full h-full bg-black rounded-full"></div>
              </div>
            </div>
            <div className="pl-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-gray-700">Mobile +1 8••-•••-••53</span>
                <button className="p-1 rounded-full bg-[#E5F2FF] text-[#0070BA] hover:bg-[#D1E9FF] transition-colors">
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[15px] text-gray-600">
                We'll show you a code on the next screen.
              </p>
            </div>
          </div>

          <Option 
            icon={<Mail className="w-6 h-6 text-gray-700" />} 
            label="Get an email" 
          />
        </div>

        {/* Next Button */}
        <button className="w-full py-4 bg-[#0054BB] hover:bg-[#004294] text-white font-bold text-lg rounded-full transition-colors mb-20 shadow-sm">
          Next
        </button>

        {/* Footer Links */}
        <div className="flex items-center gap-6 text-[13px] font-semibold text-gray-600 border-t border-gray-100 pt-8 w-full justify-center">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Legal</a>
          <a href="#" className="hover:underline">Worldwide</a>
        </div>
      </div>
    </div>
  );
}

function Option({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between w-full group cursor-pointer">
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-[17px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      </div>
      <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-gray-900 transition-colors"></div>
    </div>
  );
}