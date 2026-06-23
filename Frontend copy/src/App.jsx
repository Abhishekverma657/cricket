import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Trophy, Phone, Mail, FileUp, User, Home, ChevronLeft, ChevronRight, Star, Shield, Users, PlayCircle, Camera, CheckCircle2, AlertCircle } from 'lucide-react';

const heroImages = [
  "/images/cricket_stadium_1782103862616.png",
  "/images/batsman_action_1782103927599.png",
  "/images/bowler_action_1782103883378.png"
];

const galleryImages = [
  "/images/batsman_action_1782103927599.png",
  "/images/bowler_action_1782103883378.png",
  "/images/team_celebration_1782103893675.png",
  "/images/cricket_stadium_1782103862616.png"
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration Submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-cricket-green selection:text-white">
      
      {/* Navbar (Sticky) */}
      <nav className="fixed w-full z-50 bg-cricket-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Trophy className="h-8 w-8 text-cricket-accent" />
              <span className="font-extrabold text-2xl text-white italic tracking-wider">CCL <span className="text-cricket-green">2026</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-300 hover:text-white font-medium transition-colors">About</a>
              <a href="#details" className="text-slate-300 hover:text-white font-medium transition-colors">Details & Rules</a>
              <a href="#gallery" className="text-slate-300 hover:text-white font-medium transition-colors">Gallery</a>
            </div>
            <div>
              <a href="#register" className="bg-cricket-green hover:bg-green-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-all hover:shadow-green-500/50">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider Section */}
      <header className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt="Cricket Banner" 
              className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-cricket-dark/70 to-cricket-dark/30"></div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-4 md:left-10 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 md:right-10 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all">
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="relative z-10 text-center px-4 max-w-5xl mt-10">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cricket-accent font-bold text-sm tracking-widest uppercase mb-6 shadow-xl animate-pulse">
            <Star className="w-4 h-4" /> The Ultimate Showdown
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl uppercase italic tracking-tighter leading-tight">
            City Cricket <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cricket-green to-cricket-accent">League 2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-medium drop-shadow-md max-w-3xl mx-auto leading-relaxed">
            Where raw talent meets opportunity. Register now to showcase your skills in front of state selectors and a roaring crowd!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="inline-flex justify-center items-center gap-2 bg-cricket-green hover:bg-green-400 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:-translate-y-1">
              Join The League
            </a>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
          {heroImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-cricket-accent w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </header>

      {/* About / Highlights Section */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-cricket-dark uppercase italic tracking-tight">Why Play In CCL?</h2>
            <div className="w-24 h-1.5 bg-cricket-green mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100 transform transition-transform hover:scale-110">
                <Users className="w-10 h-10 text-cricket-green" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Professional Selectors</h3>
              <p className="text-slate-600 leading-relaxed">Play in front of reputed scouts and state-level selectors. A golden opportunity to get drafted into professional clubs.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 border border-blue-100 transform transition-transform hover:scale-110">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Live Broadcasting</h3>
              <p className="text-slate-600 leading-relaxed">All matches will be live-streamed with professional commentary on YouTube. Share your heroic moments with friends and family.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-yellow-50 rounded-full flex items-center justify-center mb-6 border border-yellow-100 transform transition-transform hover:scale-110">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Man of the Match</h3>
              <p className="text-slate-600 leading-relaxed">Exciting cash prizes, trophies, and branded cricket gears for standout performers in every single match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Event Details Section */}
      <section id="details" className="py-20 px-4 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[url('/images/cricket_stadium_1782103862616.png')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-32">
            {/* Date Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-cricket-accent transform transition-all hover:-translate-y-2 hover:shadow-cricket-accent/20">
              <Calendar className="w-12 h-12 text-cricket-accent mb-6" />
              <h3 className="text-2xl font-black text-cricket-dark mb-4">Tournament Dates</h3>
              <p className="text-slate-700 text-lg font-bold mb-2">15th - 25th October 2026</p>
              <p className="text-slate-500">Opening Ceremony: 14th Oct, 6:00 PM</p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm font-semibold text-cricket-green uppercase tracking-wider">Format: T20 Knockout</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-cricket-green rounded-3xl shadow-2xl p-10 transform transition-all hover:-translate-y-2 hover:shadow-cricket-green/30 text-white">
              <MapPin className="w-12 h-12 text-white mb-6 opacity-90" />
              <h3 className="text-2xl font-black mb-4">The Battleground</h3>
              <p className="text-white text-lg font-bold mb-2">Central Sports Ground</p>
              <p className="text-green-100">Marine Drive, Mumbai, Maharashtra 400020</p>
              <div className="mt-6 pt-6 border-t border-green-500/50">
                <a href="#" className="text-sm font-bold text-cricket-dark bg-white py-2 px-4 rounded-lg inline-block hover:bg-green-50 transition-colors">View on Map</a>
              </div>
            </div>

            {/* Prize Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-cricket-dark transform transition-all hover:-translate-y-2 hover:shadow-cricket-dark/20">
              <Trophy className="w-12 h-12 text-cricket-dark mb-6" />
              <h3 className="text-2xl font-black text-cricket-dark mb-4">Prize Pool & Entry</h3>
              <p className="text-slate-700 text-lg font-bold mb-2">Winning Prize: ₹5,00,000</p>
              <p className="text-slate-500 mb-2">Runner up: ₹2,00,000</p>
              <div className="mt-4 pt-6 border-t border-slate-100">
                <p className="text-base font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 inline-block">Entry Fee: ₹1,500 / Player</p>
              </div>
            </div>
          </div>

          {/* New Expanded Detail Box */}
          <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
            <h3 className="text-3xl font-extrabold text-white mb-8 border-b border-white/10 pb-6">League Rules & Eligibility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xl font-bold text-cricket-accent mb-5 flex items-center gap-3"><CheckCircle2 className="w-6 h-6"/> Tournament Format</h4>
                <ul className="space-y-4 text-slate-300 font-medium">
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Strictly T20 Format played with Red Leather Ball.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">16 Teams will be formulated via an open Player Auction.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Playing 11 + 4 Substitutes per squad minimum.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Matches governed by standard ICC T20 Regulations.</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-cricket-accent mb-5 flex items-center gap-3"><AlertCircle className="w-6 h-6"/> Player Eligibility</h4>
                <ul className="space-y-4 text-slate-300 font-medium">
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Age Limit: 16 to 35 Years as of Oct 1st, 2026.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Open to all residents of Maharashtra with valid ID.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Professional/Ranji players restricted to 2 per franchise.</span></li>
                  <li className="flex items-start gap-3"><span className="text-cricket-green text-xl leading-none">✦</span> <span className="pt-0.5">Deadline: Registration strictly closes on 1st October 2026.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section id="gallery" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-cricket-dark uppercase italic tracking-tight flex items-center gap-3">
                <Camera className="w-8 h-8 text-cricket-green" /> Epic Moments
              </h2>
              <div className="w-24 h-1.5 bg-cricket-green mt-4 rounded-full"></div>
            </div>
            <p className="text-slate-500 font-medium mt-4 md:mt-0">AI Generated Realism for the league</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-xl border-4 border-white">
                <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-cricket-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">View Moment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-20 px-4 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cricket-bg transform skew-x-12 translate-x-32 hidden lg:block"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-green-100 text-cricket-green font-bold text-sm tracking-widest uppercase mb-4">Limited Slots</span>
            <h2 className="text-4xl md:text-5xl font-black text-cricket-dark uppercase italic tracking-tight">Secure Your Spot</h2>
            <div className="w-24 h-1.5 bg-cricket-accent mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            {/* Image side */}
            <div className="w-full lg:w-2/5 relative hidden md:block min-h-[500px]">
              <img 
                src="/images/batsman_action_1782103927599.png" 
                alt="Batsman" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cricket-dark via-cricket-dark/80 to-cricket-green/30 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                <div className="w-12 h-1.5 bg-cricket-accent mb-6 rounded-full"></div>
                <h3 className="text-4xl font-black italic mb-4 leading-tight">Step onto the Pitch.</h3>
                <p className="text-slate-200 font-medium text-lg">Join 500+ players already registered. Registration closes soon!</p>
              </div>
            </div>

            {/* Form side */}
            <div className="w-full lg:w-3/5 p-8 md:p-14 bg-white">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green bg-slate-50 transition-all font-medium text-slate-800" 
                        placeholder="Virat Kohli" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="tel" 
                        required
                        className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green bg-slate-50 transition-all font-medium text-slate-800" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <Home className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea 
                      required
                      rows="3"
                      className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green bg-slate-50 transition-all font-medium text-slate-800" 
                      placeholder="Enter your complete address" 
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Primary Playing Role</label>
                  <div className="relative">
                    <select 
                      className="block w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cricket-green focus:border-cricket-green bg-slate-50 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                    >
                      <option value="batsman">🏏 Top Order Batsman</option>
                      <option value="middle_order">🏏 Middle Order Batsman</option>
                      <option value="fast_bowler">⚾ Fast Bowler</option>
                      <option value="spin_bowler">⚾ Spin Bowler</option>
                      <option value="allrounder">⚡ All-Rounder</option>
                      <option value="wicketkeeper">🧤 Wicket Keeper</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Payment Proof (Screenshot of ₹1,500 transfer)</label>
                  <div className="mt-1 flex justify-center px-6 pt-6 pb-8 border-2 border-slate-300 border-dashed rounded-xl hover:border-cricket-green hover:bg-green-50/50 transition-all cursor-pointer group bg-slate-50">
                    <div className="space-y-2 text-center">
                      <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileUp className="h-8 w-8 text-cricket-green" />
                      </div>
                      <div className="flex text-sm text-slate-600 justify-center font-medium">
                        <label className="relative cursor-pointer rounded-md text-cricket-green hover:text-green-700 focus-within:outline-none">
                          <span className="bg-white px-3 py-1 rounded-md border border-green-200 shadow-sm">Select File</span>
                          <input type="file" className="sr-only" accept="image/*" required />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-2">Upload UPI screenshot (JPG, PNG max 5MB)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    className="w-full flex justify-center py-4 px-4 rounded-xl shadow-[0_8px_20px_rgba(20,83,45,0.2)] text-lg font-bold text-white bg-cricket-dark hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-900/30 transition-all transform hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Confirm Registration</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 font-medium">
                    By registering, you agree to the Tournament Rules & Regulations.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 px-4 border-t-8 border-cricket-green relative overflow-hidden">
        {/* Subtle background logo/shape */}
        <div className="absolute -bottom-24 -right-24 text-white/5">
          <Trophy className="w-96 h-96" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 relative z-10">
          <div className="md:col-span-5">
            <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center">
              <Trophy className="w-10 h-10 mr-3 text-cricket-accent" />
              CCL <span className="text-cricket-green ml-2">2026</span>
            </h4>
            <p className="text-slate-400 mb-8 leading-relaxed font-medium text-lg pr-4">
              Bringing local talent to the national stage. Join us for the most exciting cricket tournament of the year. Experience the thrill, the passion, and the glory!
            </p>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-slate-700 pb-3 inline-block">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="w-5 h-5 text-cricket-accent" />
                </div>
                <span className="font-medium text-slate-400 hover:text-white transition-colors cursor-pointer pt-2">123 Sports Complex, Near Marine Drive, Mumbai</span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                  <Phone className="w-5 h-5 text-cricket-accent" />
                </div>
                <span className="font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                  <Mail className="w-5 h-5 text-cricket-accent" />
                </div>
                <span className="font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">register@ccl2026.com</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-slate-700 pb-3 inline-block">Quick Links</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="text-slate-400 hover:text-cricket-accent transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-cricket-green rounded-full mr-3"></span> About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cricket-accent transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-cricket-green rounded-full mr-3"></span> Rules & Regulations</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cricket-accent transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-cricket-green rounded-full mr-3"></span> Match Schedule</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cricket-accent transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-cricket-green rounded-full mr-3"></span> Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-slate-500 font-medium mb-4 md:mb-0">&copy; {new Date().getFullYear()} City Cricket League. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cricket-green transition-colors cursor-pointer flex items-center justify-center text-white">FB</div>
            <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cricket-green transition-colors cursor-pointer flex items-center justify-center text-white">IG</div>
            <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cricket-green transition-colors cursor-pointer flex items-center justify-center text-white">YT</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
