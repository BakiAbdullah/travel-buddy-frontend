const Logo = ({ isScrolled = false }: { isScrolled?: boolean }) => {
  return (
    <div className="flex items-center gap-3 group">
      {/* Modern Travel Icon */}
      <div className="relative">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
            ${isScrolled ? 'text-primary' : 'text-white'}
          `}
        >
          {/* Outer Ring */}
          <circle
            cx="21"
            cy="21"
            r="19"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          />
          
          {/* Inner Compass Ring */}
          <circle
            cx="21"
            cy="21"
            r="14"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          />
          
          {/* Main Compass Needle - North (Primary) */}
          <path
            d="M21 5L25 17L21 21L17 17L21 5Z"
            fill="currentColor"
            className="opacity-90 group-hover:opacity-100 transition-all duration-500"
          />
          
          {/* South Needle */}
          <path
            d="M21 37L17 25L21 21L25 25L21 37Z"
            fill="currentColor"
            className="opacity-60 group-hover:opacity-80 transition-all duration-500"
          />
          
          {/* East/West Needles */}
          <path
            d="M37 21L25 17L21 21L25 25L37 21Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          <path
            d="M5 21L17 25L21 21L17 17L5 21Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          
          {/* Center Dot */}
          <circle
            cx="21"
            cy="21"
            r="2.5"
            fill="currentColor"
            className="group-hover:scale-125 transition-transform duration-300"
          />
          
          {/* Cardinal Points */}
          <circle cx="21" cy="7" r="1.5" fill="currentColor" className="opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <circle cx="21" cy="35" r="1.5" fill="currentColor" className="opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <circle cx="7" cy="21" r="1.5" fill="currentColor" className="opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <circle cx="35" cy="21" r="1.5" fill="currentColor" className="opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Decorative Elements */}
          <path
            d="M21 3L21 7M21 35L21 39M3 21L7 21M35 21L39 21"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          />
        </svg>
        
        {/* Subtle glow effect */}
        <div className={`
          absolute inset-0 rounded-full blur-xl scale-0 group-hover:scale-150 transition-all duration-700 -z-10
          ${isScrolled ? 'bg-primary/10' : 'bg-white/20'}
        `} />
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span 
          className={`
            text-xl font-bold leading-none tracking-tight transition-colors duration-300
            ${isScrolled 
              ? 'text-gray-900 dark:text-white group-hover:text-primary' 
              : 'text-white group-hover:text-white/90'
            }
          `}
          style={{
            textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          TravelBuddy
        </span>
        <span 
          className={`
            text-xs font-medium tracking-wider uppercase transition-colors duration-300
            ${isScrolled 
              ? 'text-gray-600 dark:text-gray-400 group-hover:text-primary/70' 
              : 'text-white/80 group-hover:text-white/70'
            }
          `}
          style={{
            textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}
        >
          Explore Together
        </span>
      </div>
    </div>
  );
};

export default Logo;
