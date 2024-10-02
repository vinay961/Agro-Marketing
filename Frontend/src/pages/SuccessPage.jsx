import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage or desired route
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for visiting our store! Your payment has been successfully processed.
        We will reach out to you as soon as possible to complete your order.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white font-bold py-2 px-6 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
