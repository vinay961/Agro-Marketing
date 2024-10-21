import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage or desired route
  };

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-4 text-center">
        Payment Successful!
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 text-center max-w-2xl">
        Thank you for visiting our store! Your payment has been successfully processed. We will reach out to you as soon as possible to complete your order.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-all duration-300 ease-in-out"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
