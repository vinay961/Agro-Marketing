import { useState } from 'react';

function Register() {
  const [role, setRole] = useState('customer'); // Default to 'customer'

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission and send the data to your backend
    console.log('Form submitted:', { role, /* other form data */ });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-2 border border-gray-300 rounded"
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
