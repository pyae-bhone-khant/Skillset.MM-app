'use client';
import React, { useState } from 'react';
import { User, Mail, Lock, Camera, Save, BookOpen, FileText } from 'lucide-react';

export default function ProfilePage() {
  // Form State Management
  const [formData, setFormData] = useState({
    fullName: 'Pyae Bhone Khant',
    email: 'nextgen234345@gmail.com',
    bio: '',
    category: '',
    newPassword: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving changes...", formData);
    // Backend API handles database update here
  };

  return (
    <div className="min-h-screen text-slate-200 p-6 md:p-12" style={{ backgroundColor: '#010114' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <User size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Personal Information</h1>
            <p className="text-xs text-slate-400 mt-1">Update your account details and profile image.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* PROFILE AVATAR UPLOAD */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Profile Avatar
            </span>
            <div className="relative w-32 h-32">
              {/* Avatar Circle */}
              <div className="w-full h-full rounded-full border-2 border-slate-800 bg-[#05051a]/60 overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={56} className="text-slate-500" />
                )}
              </div>
              {/* Camera Upload Button (Matching red icon placement from 490.jpg to Blue Theme) */}
              <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 w-9 h-9 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-blue-950/50 transition-colors">
                <Camera size={16} />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
          </div>

          {/* INPUT FIELDS GRID (2-Column Layout like 490.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
            {/* Email Address Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Specialized Category Select Field (Crucial for Version 1 Teachers) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <BookOpen size={14} /> Specialized Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none"
              >
                <option value="" className="bg-[#010114]">Select Category (For Teachers)</option>
                <option value="IT" className="bg-[#010114]">Information Technology (IT)</option>
                <option value="Language" className="bg-[#010114]">Languages</option>
                <option value="Cooking" className="bg-[#010114]">Cooking & Culinary</option>
                <option value="Art" className="bg-[#010114]">Art & Creative</option>
              </select>
            </div>

            {/* New Password Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Lock size={14} /> New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Biography Input (Full width below the grid) */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <FileText size={14} /> Biography / About Yourself
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Write a short introduction about yourself or your teaching experience..."
                className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>

          </div>

          {/* SAVE CHANGES BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-950/50 transition-all active:scale-95"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}