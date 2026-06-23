import React, { useState } from 'react';
import { Trophy, FileUp, CheckCircle2, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    role: 'batsman'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload payment proof.");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Image to Cloudinary (Free, No Card Required)
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      
      // TODO: Replace YOUR_UPLOAD_PRESET and YOUR_CLOUD_NAME
      // 1. Go to cloudinary.com, create a free account
      // 2. Go to Settings -> Upload -> Add upload preset (Unsigned)
      // 3. Put that preset name here:
      cloudinaryFormData.append("upload_preset", "ml_default");
      
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dqycaz9i9/image/upload",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      
      const cloudinaryData = await cloudinaryResponse.json();
      
      if (!cloudinaryResponse.ok) {
        throw new Error(cloudinaryData.error?.message || "Failed to upload image to Cloudinary");
      }
      
      const downloadURL = cloudinaryData.secure_url;

      // 2. Save data to Firestore
      await addDoc(collection(db, "registrations"), {
        ...formData,
        paymentProofUrl: downloadURL,
        timestamp: serverTimestamp()
      });

      setSubmitted(true);
      // Reset form
      setFormData({ fullName: '', mobile: '', address: '', role: 'batsman' });
      setFile(null);
    } catch (error) {
      console.error("Error submitting registration: ", error);
      alert("Something went wrong. Please check your Firebase configuration or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* 1. Top Banner */}
      <header className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/images/cricket_stadium_1782103862616.png" 
            alt="Cricket Stadium Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-cricket-dark/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 pt-4">
          <div className="flex justify-center mb-5">
            <Trophy className="h-16 w-16 text-cricket-accent drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter drop-shadow-2xl mb-3">
            City Cricket League
          </h1>
          <p className="text-xl md:text-2xl text-cricket-accent font-bold tracking-widest uppercase">
            Player Registration
          </p>
        </div>
      </header>

      {/* 2. Registration Form */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 -mt-24 relative z-20 pb-24">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
          
          <div className="bg-cricket-green px-8 py-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Secure Your Spot</h2>
              <p className="text-green-100 font-medium text-sm mt-1">Entry Fee: ₹1,500 / Player</p>
            </div>
            <span className="bg-white/20 px-4 py-1.5 rounded-lg text-sm font-bold tracking-wider">15-25 OCT</span>
          </div>

          {submitted ? (
            <div className="p-16 text-center space-y-5">
               <div className="flex justify-center mb-6">
                 <CheckCircle2 className="w-24 h-24 text-cricket-green" />
               </div>
               <h2 className="text-3xl font-black text-slate-800">Registration Successful!</h2>
               <p className="text-slate-600 text-lg font-medium max-w-lg mx-auto">Your details and payment proof have been received. We will verify and contact you shortly.</p>
               <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-sm"
               >
                 Register Another Player
               </button>
            </div>
          ) : (
            <div className="p-8 sm:p-14">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green outline-none transition-colors bg-slate-50 text-slate-800 font-medium" 
                      placeholder="e.g. Virat Kohli" 
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number (WhatsApp)</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green outline-none transition-colors bg-slate-50 text-slate-800 font-medium" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green outline-none transition-colors bg-slate-50 resize-none text-slate-800 font-medium" 
                    placeholder="Enter your complete address" 
                  ></textarea>
                </div>

                {/* Playing Role */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Primary Playing Role</label>
                  <div className="relative">
                    <select 
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green outline-none transition-colors bg-slate-50 appearance-none cursor-pointer font-bold text-slate-700"
                    >
                      <option value="batsman">🏏 Batsman</option>
                      <option value="fast_bowler">⚾ Fast Bowler</option>
                      <option value="spin_bowler">⚾ Spin Bowler</option>
                      <option value="allrounder">⚡ All-Rounder</option>
                      <option value="wicketkeeper">🧤 Wicket Keeper</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Payment Proof */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Payment Proof (Screenshot of ₹1,500)</label>
                  <div className="mt-2 flex justify-center px-6 py-10 border-2 border-slate-300 border-dashed rounded-xl hover:border-cricket-green hover:bg-green-50/50 transition-colors cursor-pointer group bg-slate-50">
                    <div className="space-y-4 text-center">
                      <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileUp className="h-8 w-8 text-cricket-green" />
                      </div>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label className="relative cursor-pointer rounded-md font-bold text-cricket-green hover:text-green-700">
                          <span className="bg-white px-5 py-2.5 rounded-lg border border-slate-200 shadow-sm transition-colors group-hover:border-green-300">
                            {file ? file.name : "Browse Image"}
                          </span>
                          <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} required />
                        </label>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-2">JPG, PNG format (Max 5MB)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex justify-center items-center py-5 px-4 rounded-xl shadow-[0_8px_20px_rgba(20,83,45,0.2)] text-xl font-bold text-white bg-cricket-dark hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-900/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer / Contact Details */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 mt-auto border-t-8 border-cricket-green">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          <div className="text-center md:text-left flex-1">
            <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-3 flex items-center justify-center md:justify-start">
              <Trophy className="w-8 h-8 mr-3 text-cricket-accent" />
              CCL <span className="text-cricket-green ml-2">2026</span>
            </h4>
            <p className="text-slate-400 font-medium">Official Player Registration Portal. Reach out to us for any queries.</p>
          </div>
          
          <div className="flex-1">
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start">
                <MapPin className="w-6 h-6 mr-4 text-cricket-green shrink-0" />
                <span className="font-semibold text-slate-400">123 Sports Complex, Mumbai</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-6 h-6 mr-4 text-cricket-green shrink-0" />
                <span className="font-semibold text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-6 h-6 mr-4 text-cricket-green shrink-0" />
                <span className="font-semibold text-slate-400">register@ccl2026.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm font-semibold text-slate-500">
          &copy; {new Date().getFullYear()} City Cricket League. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
