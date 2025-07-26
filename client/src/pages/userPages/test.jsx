  <div className="flex justify-center space-x-6 text-gray-600">
            <span className="underline cursor-pointer hover:text-indigo-600 transition">Terms & Conditions</span>
            <span className="underline cursor-pointer hover:text-indigo-600 transition">Privacy Policy</span>
          </div>
          
          {/* Right - Social Icons */}
          <div className="flex justify-center space-x-6 text-gray-600">
            <FaFacebookF className="cursor-pointer hover:text-[#1877F2] transition text-lg" />
            <RxCross2 className="cursor-pointer hover:text-gray-900 transition text-lg" />
            <FaInstagram className="cursor-pointer hover:text-[#E4405F] transition text-lg" />
          </div>


   {(error || message) && (
  <div
    className={`
      w-full max-w-md mx-auto flex items-center gap-4 p-4 rounded-lg
      border-2
      text-gray-900 font-semibold text-base
      bg-white bg-opacity-90
      shadow-lg
      animate-fadeIn
      ${error
        ? 'border-red-600 text-red-700'
        : 'border-green-600 text-green-700'}
    `}
    role="alert"
  >
    <svg
      className={`w-6 h-6 flex-shrink-0 ${
        error ? 'text-red-600' : 'text-green-600'
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {error ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      )}
    </svg>
    <span>{error || message}</span>
  </div>
)}
   {(error || message) && (
  <div className={`flex items-center gap-3 p-3 rounded-md text-sm font-medium max-w-md w-full
    ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
    <span>{error ? '❌' : '✅'}</span>
    {error || message}
  </div>
)}