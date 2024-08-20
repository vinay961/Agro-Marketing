import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Api.jsx';

function Login({ login }) { // Receive login function as prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/users/login", { email, password });
      console.log('Login successful:', response.data);
      setSuccessMessage('Login Successful, Redirecting to marketplace...');
      
      // Call the login function passed from App.jsx to update auth state
      login(response.data);

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/marketplace');
      }, 2000);

      setErrorMessage('');
    } catch (error) {
      console.error("Login failed!", error.response?.data || error.message);
      setErrorMessage("Login failed! " + (error.message || "Something went wrong"));
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {successMessage && (
          <div className="mb-4 text-green-500 text-center shadow-lg p-2 rounded"
            style={{ boxShadow: '0 4px 6px rgba(34, 197, 94, 0.5)' }}
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center p-2 rounded"
            style={{ boxShadow: '0 4px 6px rgba(239, 68, 68, 0.5)' }}
          >
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-green-500 hover:text-green-700">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
