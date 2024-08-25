import React, { useEffect, useState } from 'react';

const ProfileView = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUserInfo({
        name: storedUser.name || '',
        email: storedUser.email || '',
        role: storedUser.role || '',
      });
    }
  }, []);

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
            <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{capitalizeName(userInfo.name)}</h2>
          <p className="text-gray-600">{userInfo.email}</p>
          <span className="text-gray-500 text-sm">{capitalizeName(userInfo.role)}</span>
        </div>

        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg shadow mt-3 hover:bg-red-600 transition duration-200">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
