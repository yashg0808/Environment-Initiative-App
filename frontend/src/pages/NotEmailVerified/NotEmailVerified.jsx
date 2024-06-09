import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth/AuthService';
import ApiError from '../../services/ApiError';
import { logOut } from '../../store/AuthSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const NotEmailVerified = () => {

  const isLoggedIn = useAppSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const isLoginCheckDone = useAppSelector(
    (state) => {
      return state.auth.isLogInCheckDone
    }
  );

  const isEmailVerified = useAppSelector(
    (state) => {
      return state.auth.userDetails?.isEmailVerified;
    }
  );
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const [isResending, setIsResending] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    const respose = await AuthService.resendEmailVerification();
    if (respose instanceof ApiError) {
      console.log(respose.errorMessage);
    }
    console.log('Resend verification email');
    setIsResending(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const response = await AuthService.logoutService();
    if (response instanceof ApiError) {
      setErrorMessage(response.errorResponse?.message || response.errorMessage)
    } else {
      dispatch(logOut());
    }
    setIsLoggingOut(false);
  };

  useEffect(() => {
    if (isLoginCheckDone && isEmailVerified === true) {
      navigate("/");
    }
  }, [isLoginCheckDone, isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-4">Please verify your email address to continue.</p>
        <button
          onClick={handleResendVerification}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 mb-4 ${isResending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={isResending}
        >
          {isResending ? 'Resending...' : 'Resend Verification Email'}
        </button>
        <button
          onClick={handleLogout}
          className={`bg-red-500 text-white px-4 py-2 rounded-lg transition duration-200 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default NotEmailVerified;
