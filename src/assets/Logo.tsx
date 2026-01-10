const Logo = ({ isScrolled = false }: { isScrolled?: boolean }) => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Modern Travel Icon */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-all duration-700 group-hover:scale-110 group-hover:rotate-6
            ${isScrolled ? 'text-blue-500' : 'text-white'}
          `}
        >
          {/* Background Circle with Gradient Effect */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          
          {/* Outer Decorative Ring */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="url(#logoGradient)"
            className="opacity-20 group-hover:opacity-30 transition-all duration-700"
          />
          
          {/* Main Background Circle */}
          <circle
            cx="22"
            cy="22"
            r="16"
            fill="currentColor"
            className="opacity-10 group-hover:opacity-15 transition-all duration-700"
          />
          
          {/* Compass Rose Design */}
          {/* Main North Arrow */}
          <path
            d="M22 6L26 18L22 22L18 18L22 6Z"
            fill="url(#compassGradient)"
            className="group-hover:scale-110 transition-transform duration-500 origin-center"
          />
          
          {/* South Arrow */}
          <path
            d="M22 38L18 26L22 22L26 26L22 38Z"
            fill="currentColor"
            className="opacity-70 group-hover:opacity-85 group-hover:scale-110 transition-all duration-500 origin-center"
          />
          
          {/* East Arrow */}
          <path
            d="M38 22L26 18L22 22L26 26L38 22Z"
            fill="currentColor"
            className="opacity-60 group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 origin-center"
          />
          
          {/* West Arrow */}
          <path
            d="M6 22L18 26L22 22L18 18L6 22Z"
            fill="currentColor"
            className="opacity-60 group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 origin-center"
          />
          
          {/* Diagonal Arrows for 8-point compass */}
          <path
            d="M31.5 12.5L25 19L22 22L25 19L31.5 12.5Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          <path
            d="M31.5 31.5L25 25L22 22L25 25L31.5 31.5Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          <path
            d="M12.5 31.5L19 25L22 22L19 25L12.5 31.5Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          <path
            d="M12.5 12.5L19 19L22 22L19 19L12.5 12.5Z"
            fill="currentColor"
            className="opacity-40 group-hover:opacity-60 transition-all duration-500"
          />
          
          {/* Center Hub */}
          <circle
            cx="22"
            cy="22"
            r="3"
            fill="currentColor"
            className="group-hover:scale-125 transition-transform duration-300"
          />
          
          {/* Inner Center Dot */}
          <circle
            cx="22"
            cy="22"
            r="1.5"
            fill={isScrolled ? "white" : "rgba(0,0,0,0.3)"}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Decorative Outer Marks */}
          <g className="opacity-50 group-hover:opacity-70 transition-opacity duration-500">
            <line x1="22" y1="2" x2="22" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="38" x2="22" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="22" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="38" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          
          {/* Subtle Ring Animation */}
          <circle
            cx="22"
            cy="22"
            r="12"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="opacity-20 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-110"
            strokeDasharray="2 4"
          />
        </svg>
        
        {/* Enhanced glow effect */}
        <div className={`
          absolute inset-0 rounded-full blur-2xl scale-0 group-hover:scale-125 transition-all duration-1000 -z-10
          ${isScrolled ? 'bg-blue-500/20' : 'bg-white/30'}
        `} />
        
        {/* Pulse effect */}
        <div className={`
          absolute inset-0 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-20 transition-all duration-1500 -z-20
          ${isScrolled ? 'bg-blue-400' : 'bg-white'}
        `} />
      </div>
      
      {/* Enhanced Brand Text */}
      <div className="flex flex-col">
        <span 
          className={`
            text-base md:text-xl font-bold leading-none tracking-tight transition-all duration-300 group-hover:tracking-wide
            ${isScrolled 
              ? 'text-gray-900 dark:text-white group-hover:text-blue-500' 
              : 'text-white group-hover:text-white/95'
            }
          `}
          style={{
            textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          TripMates
        </span>
        <span 
          className={`
            text-xs font-medium tracking-widest uppercase transition-all duration-300 group-hover:tracking-wider
            ${isScrolled 
              ? 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500' 
              : 'text-white/75 group-hover:text-white/85'
            }
          `}
          style={{
            textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.1em'
          }}
        >
          Find Your Journey
        </span>
      </div>
    </div>
  );
};

export default Logo;
