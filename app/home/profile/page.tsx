'use client';
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Save, BookOpen, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/authprovider';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { profile } from 'console';

export default function ProfilePage() {
  const { user, setUser } = useAuth(); 

  
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user?.profile?.avatarUrl || '');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.profile?.fullName || '',
    email: user?.email || '',
    bio: user?.profile?.bio || '',
    category: user?.profile?.category || '',
    newPassword: ''
  }); 
   
  const userData = async () => {
    const result = await api.get('/user');
    localStorage.setItem('user', JSON.stringify(result.data.user));
    setUser(result.data.user);
  }

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.profile?.fullName || '',
        email: user?.email || '',
        bio: user?.profile?.bio || '',
        category: user?.profile?.category || '',
        newPassword: ''
      });
      setImagePreview(user?.profile?.avatarUrl || '');
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted - Starting API request");
    console.log("User:", user);
    setLoading(true);
    
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) dataToSend.append(key, value);
      });

      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      await api.post("/profile", dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }); 
      await userData(); 
      toast.success("Profile updated successfully");
    } catch (error: any) {
     
     
    } finally {
      setLoading(false);
    }
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
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Profile Avatar</span>
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full border-2 border-slate-800 bg-[#05051a]/60 overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={56} className="text-slate-500" />
                )}
              </div>
              <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 w-9 h-9 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-blue-950/50 transition-colors">
                <Camera size={16} />
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* INPUT FIELDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400"><User size={14} /> Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400"><Mail size={14} /> Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400"><BookOpen size={14} /> Specialized Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-blue-500/50 transition-all">
                <option value="" className="bg-app-bg">Select Category</option>
                <option value="IT" className="bg-app-bg">Information Technology (IT)</option>
                <option value="Language" className="bg-app-bg">Languages</option>
                <option value="Cooking" className="bg-app-bg">Cooking & Culinary</option>
                <option value="Art" className="bg-app-bg">Art & Creative</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400"><Lock size={14} /> New Password</label>
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} placeholder="Leave blank to keep current" className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-400"><FileText size={14} /> Biography</label>
              <textarea name="bio" rows={4} value={formData.bio} onChange={handleInputChange} className="w-full bg-[#05051a]/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Saving..." : "Save Changes"}
          </button> 
        </form>
      </div> 
    </div>
  );
}