import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../../redux/features/user/userActions';
import { useNavigate } from 'react-router-dom';

export default function EnterOtp() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const email = useSelector((state) => state.user.emailForOTP);
  const navigate = useNavigate();

  const validateOTP = () => {
    if (!otp) {
      return 'OTP is required';
    }
    if (!/^\d{6}$/.test(otp)) {
      return 'OTP must be a 6-digit number';
    }
    return '';
  };

  const submitOTP = (e) => {
    e.preventDefault();
    const validationError = validateOTP();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    dispatch(verifyOTP({ email, otp })).then((resultAction) => {
      if (verifyOTP.fulfilled.match(resultAction)) {
        navigate('/home');
      } else {
        setError('Invalid or expired OTP. Please try again.');
      }
    });
  };

  return (
   <div className="min-h-screen flex flex-col md:flex-row">
  {/* Promo Section */}
  <div
    className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-green-900 text-white text-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-opacity-75 md:bg-opacity-60 bg-green-900"></div>

    <div className="relative z-10 max-w-md space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
        VERIFY YOUR ACCOUNT
      </h1>
      <p className="text-base md:text-lg drop-shadow-md">
        Please enter the OTP sent to your email to continue.
      </p>
      <div className="bg-green-700 bg-opacity-80 rounded-lg px-6 py-3 shadow-lg font-semibold tracking-wide text-lg md:text-xl inline-block">
        LittleHope Security
      </div>
    </div>
  </div>

  {/* OTP Form Section */}
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl shadow-lg">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
      Enter OTP
    </h2>
    <p className="text-gray-600 mb-8 max-w-md text-center">
      We've sent a 6-digit verification code to your <span className="font-semibold">{email}</span>
    </p>

    <form onSubmit={submitOTP} className="w-full max-w-md space-y-6">
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          OTP Code <span className="text-red-500">*</span>
        </label>
        <input
          value={otp}
          type="text"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className={`w-full border rounded-lg px-5 py-3 text-lg tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && (
          <p className="text-red-600 text-xs mt-1 flex items-center gap-2">
            <span className="bg-red-500 rounded-full px-2 text-white font-bold">!</span> {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
      >
        Verify OTP
      </button>
    </form>

    <p className="text-center text-gray-600 mt-8 max-w-md text-sm">
      Didn&apos;t get the code?{' '}
      <button
        // onClick={handleResendOTP}
        className="text-green-600 font-semibold hover:underline"
      >
        Resend OTP
      </button>
    </p>
  </div>
</div>

  );
}


