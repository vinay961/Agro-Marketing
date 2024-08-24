import { useState } from 'react';
import { post } from '../services/Api.jsx';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      name,
      email,
      password,
      role,
    };

    try {
      // Send the registration request to the backend
      const response = await post('/users/register', registrationData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Registration successful:', response.data);
      
      // Show success message and clear error message
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(()=>{
        setSuccessMessage('')
      })
      setErrorMessage('');

      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Show error message and clear success message
      setErrorMessage('Registration failed: ' + (error.response?.data?.message || 'Something went wrong.'));
      setTimeout(()=>{
        setErrorMessage('')
      },1000)
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="customer"
                name="role"
                value="customer"
                checked={role === 'customer'}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="customer" className="mr-4">Customer</label>
              <input
                type="radio"
                id="farmer"
                name="role"
                value="farmer"
                checked={role === 'farmer'}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="farmer">Farmer</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
