

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
const ProfilePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState({ username: false, email: false, phone: false });
  const [profile, setProfile] = useState({});

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', relation: '', phone: '' },
    
  ]);

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', relation: '', phone: '' }]);
  };

  const handleProfileChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
const getUser = async () => {
try {
  const res= await axios.get("http://localhost:5000/api/auth/getuser",{withCredentials:true})
  if(res.data.success){
    setProfile(res.data.user)
  }
} catch (error) {
  console.log(error)
}
}
useEffect(() => {
getUser()
},[])
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index][field] = value;
    setEmergencyContacts(updatedContacts);
  };

  // Function to delete an emergency contact
  const deleteContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto space-y-6">

      <div className="flex justify-between items-center p-4  transition-colors duration-300">
      <a href="/LandingPage2" className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${!darkMode ? 'text-gray-800' : 'text-white'}`}>
  SafeYatra
</a>
</div>
        {/* Profile Header */}

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                <img
                  src="src\\avatarr.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="absolute bottom-0 right-0 rounded-full p-1.5 bg-white text-gray-700 shadow-md hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked::translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Personal Information */}
        <div className={`rounded-lg shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Name</p>
                  {isEditing.username ? (
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="font-medium text-lg border-b-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-lg">{profile.username}</p>
                  )}
                </div>
                <button
                  className={`p-2 rounded-md hover:${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}
                  onClick={() => setIsEditing({ ...isEditing, name: !isEditing.name })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  {isEditing.email ? (
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="font-medium text-lg border-b-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-lg">{profile.email}</p>
                  )}
                </div>
                <button
                  className={`p-2 rounded-md hover:${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}
                  onClick={() => setIsEditing({ ...isEditing, email: !isEditing.email })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone Number</p>
                  {isEditing.phone ? (
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="font-medium text-lg border-b-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-lg">{profile.phone}</p>
                  )}
                </div>
                <button
                  className={`p-2 rounded-md hover:${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}
                  onClick={() => setIsEditing({ ...isEditing, phone: !isEditing.phone })}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
       {/* Emergency Contacts */}
<form onSubmit={(e) => {
  e.preventDefault();
  // Handle form submission logic here
}} className={`rounded-lg shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
  <div className="px-6 py-4 flex flex-row items-center justify-between border-b border-gray-200 ">
    <h2 className="text-xl font-semibold">Emergency Contacts</h2>
    <button
      type="button"
      onClick={addEmergencyContact}
      className={`px-3 py-1 rounded-md border flex items-center gap-2 ${darkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-200 hover:bg-gray-50'}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      Add Contact
    </button>
  </div>
  <div className="p-6">
    <div className="space-y-4">
      {emergencyContacts.map((contact, index) => (
        <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-start ">
            <div className="space-y-1">
              <input
                type="text"
                value={contact.name}
                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                placeholder="Name"
                className="font-medium"
              />
              <input
                
                type="text"
                value={contact.relation}
                onChange={(e) => handleContactChange(index, 'relation', e.target.value)}
                placeholder="Relation"
                className="text-sm"
              />
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                placeholder="Phone Number"
                className="text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => deleteContact(index)}
              className={`p-2 rounded-md hover:${darkMode ? 'bg-slate-600' : 'bg-gray-100'}`}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="px-6 py-4 border-t border-gray-200">
    <button
      type="submit"
      className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
    >
      Save Emergency Contacts
    </button>
  </div>
</form>

        {/* Previous Reports */}
        <div className={`rounded-lg shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Previous Reports</h2>
          </div>
          <div className="p-6">
            <button
            onClick={() => navigate("/report")}
            className="w-full flex justify-between items-center text-purple-500 hover:text-purple-600 py-2">

              See all reports
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;