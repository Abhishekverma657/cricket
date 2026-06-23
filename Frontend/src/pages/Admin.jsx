import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Lock, Shield, Image as ImageIcon, Loader2, X } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Simple hardcoded password
  const ADMIN_PASSWORD = "admin@123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      alert("Incorrect Password!");
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data. Is Firebase configured correctly?");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border-t-4 border-cricket-green">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Lock className="w-8 h-8 text-cricket-green" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Admin Access Required</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cricket-green outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-cricket-dark hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cricket-green" />
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
          </div>
          <button 
            onClick={fetchRegistrations}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold shadow-sm"
          >
            Refresh Data
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-800 text-white">
            <h2 className="text-xl font-bold">Total Registrations: {registrations.length}</h2>
          </div>

          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-cricket-green" />
              <p className="font-medium">Loading registrations from Firebase...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-20 text-center text-slate-500 font-medium">
              No registrations found. Or Firebase is not configured yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold border-b border-slate-200">#</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Date</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Player Name</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Mobile</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Role</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Address</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 text-center">Payment Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {reg.timestamp?.toDate ? new Date(reg.timestamp.toDate()).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">{reg.fullName}</td>
                      <td className="px-6 py-4 font-medium text-slate-600">{reg.mobile}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          {reg.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={reg.address}>
                        {reg.address}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {reg.paymentProofUrl ? (
                          <button 
                            onClick={() => setSelectedImage(reg.paymentProofUrl)}
                            className="inline-flex items-center justify-center p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-cricket-dark rounded-lg transition-colors"
                            title="View Image"
                          >
                            <ImageIcon className="w-5 h-5" />
                          </button>
                        ) : (
                          <span className="text-slate-400 text-sm">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Payment Proof</h3>
              <button onClick={() => setSelectedImage(null)} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-auto flex justify-center bg-slate-200/50">
              <img src={selectedImage} alt="Payment Proof" className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
