import { ChevronDown } from 'lucide-react';
import { memo } from 'react';

export const Navbar = memo(function Navbar() {
  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-10">
        {/* PayPal Logo Mock */}
        <div className="flex items-center">
          <svg
            viewBox="0 0 200 200"
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg">
            
            <path
              d="M55.4,153.8l14.1-89.2c0.3-1.9,1.9-3.3,3.8-3.3h38.2c18.5,0,28.8,8.8,26.4,24.1 c-2,12.5-11.2,22.2-23.4,24.1c-1.5,0.2-2.7,1.4-3,2.9l-0.3,1.6l-2.4,15.4l-0.2,1.1c-0.3,1.9-1.9,3.3-3.8,3.3H81.6 c-2.3,0-4,2.1-3.6,4.4l-5.6,35.6c-0.3,1.9-1.9,3.3-3.8,3.3H55.4z"
              fill="#003087" />
            
            <path
              d="M68.5,70.8l-8.8,55.6c-0.3,1.9,1.2,3.6,3.1,3.6h18.2c1.9,0,3.5-1.4,3.8-3.3l5.8-36.7l0.2-1.1 c0.3-1.9,1.9-3.3,3.8-3.3h16.5c12.2-1.9,21.4-11.6,23.4-24.1c0.8-5.1,0.2-9.8-1.7-13.7c-3.6-7.5-11.9-11.5-22.6-11.5H72.3 C70.4,39.3,68.8,40.7,68.5,42.6L68.5,70.8z"
              fill="#0079C1" />
            
            <path
              d="M108.9,70.8h-16.5c-1.9,0-3.5,1.4-3.8,3.3l-0.2,1.1l-5.8,36.7c-0.3,1.9-2.3,3.1-4.1,2.5 c-3.3-1.1-6.8-1.7-10.4-1.7H55.4c-1.9,0-3.5,1.4-3.8,3.3L37.5,175c-0.3,1.9,1.2,3.6,3.1,3.6h23.2c1.9,0,3.5-1.4,3.8-3.3l5.6-35.6 c0.3-1.9,1.9-3.3,3.8-3.3h23.2c18.5,0,32.2-10.6,35.4-30.8C138.8,85.2,127.4,70.8,108.9,70.8z"
              fill="#0079C1" />
            
          </svg>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavItem text="Personal" hasDropdown />
          <NavItem text="Business" hasDropdown />
          <NavItem text="Advertiser" hasDropdown />
          <NavItem text="Developer" />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <a
          href="#"
          className="hidden md:block text-sm font-semibold text-gray-900 hover:underline mr-2">
          Help
        </a>
        <button className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-[13px] sm:text-sm hover:bg-gray-50 transition-colors">
          Log In
        </button>
        <button className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gray-900 text-white font-bold text-[13px] sm:text-sm hover:bg-gray-800 transition-colors">
          Sign Up
        </button>
      </div>
    </nav>);

});
function NavItem({
  text,
  hasDropdown = false



}: {text: string;hasDropdown?: boolean;}) {
  return (
    <button className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-900 hover:text-gray-600 transition-colors group">
      {text}
      {hasDropdown &&
      <ChevronDown
        className="w-4 h-4 text-gray-900 group-hover:text-gray-600 transition-colors"
        strokeWidth={2.5} />

      }
    </button>);

}