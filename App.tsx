import React, { useState, useRef, useEffect } from 'react';
import { generateBirthdayWish } from './services/geminiService';
import { WishTone } from './types';
import Confetti from './components/Confetti';
import CardControls from './components/CardControls';
import { Sparkles, Gift, Heart, Download } from './components/Icons';

const App: React.FC = () => {
  const [name, setName] = useState('Mir Hussain');
  const [tone, setTone] = useState<WishTone>(WishTone.PROFESSIONAL);
  const [message, setMessage] = useState("Wishing you a fantastic birthday filled with innovation, success, and great teamwork!");
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after 5 seconds to not be annoying
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateWish = async () => {
    setIsGenerating(true);
    const newWish = await generateBirthdayWish(name, tone);
    setMessage(newWish);
    setIsGenerating(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      {showConfetti && <Confetti />}

      <header className="max-w-7xl mx-auto mb-12 text-center no-print">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
          <Gift className="text-purple-600" size={20} />
          <span className="text-sm font-medium text-gray-600">Birthday Card Generator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
          Celebrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{name}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a personalized digital card for your colleague's special day.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <CardControls
            name={name}
            setName={setName}
            tone={tone}
            setTone={setTone}
            isGenerating={isGenerating}
            onGenerate={handleGenerateWish}
            onImageUpload={handleImageUpload}
          />
          
          <div className="mt-6 bg-purple-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative no-print">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-700 rounded-full opacity-50 blur-xl"></div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Heart className="text-pink-400" size={20} />
              Pro Tip
            </h3>
            <p className="text-purple-100 text-sm opacity-90">
              Upload the photo of Mir working at the desk to make this card truly memorable!
            </p>
          </div>
        </div>

        {/* Right Column: The Card Preview */}
        <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center items-start">
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.01] card-container border border-gray-100">
            {/* Inner Border */}
            <div className="border-4 border-double border-purple-200 rounded-lg p-6 md:p-10 h-full flex flex-col items-center text-center relative bg-[#fafafa]">
              
              {/* Decorative Corner */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-300"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-300"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-300"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-300"></div>

              {/* Title */}
              <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-8 italic">
                Happy Birthday!
              </h2>

              {/* Photo Frame */}
              <div className="relative w-full max-w-md aspect-[4/3] mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg transform rotate-2 shadow-lg group-hover:rotate-3 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-white rounded-lg transform -rotate-1 shadow-md border border-gray-200"></div>
                
                <div className="absolute inset-2 bg-gray-100 rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="Celebrant" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-8">
                       <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                         <Gift size={32} />
                       </div>
                       <p className="text-gray-400 font-medium">Upload a photo to begin</p>
                       <p className="text-xs text-gray-400 mt-2">Recommended: That photo of Mir at the desk!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="relative z-10 max-w-lg mx-auto mb-8">
                <Sparkles className="absolute -top-6 -left-6 text-yellow-400 opacity-75" size={32} />
                <p className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed">
                  "{message}"
                </p>
                <Sparkles className="absolute -bottom-4 -right-4 text-purple-400 opacity-75" size={24} />
              </div>

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-gray-200 w-full">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                  To {name} • From Your Team
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <div className="fixed bottom-6 right-6 no-print">
        <button 
          onClick={handlePrint}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center gap-2"
          title="Print Card"
        >
          <Download size={20} />
          <span className="hidden md:inline">Print / Save PDF</span>
        </button>
      </div>
    </div>
  );
};

export default App;