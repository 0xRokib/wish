import React from 'react';
import { WishTone } from '../types';
import { RefreshCw, Sparkles, Upload } from './Icons';

interface CardControlsProps {
  name: string;
  setName: (name: string) => void;
  tone: WishTone;
  setTone: (tone: WishTone) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardControls: React.FC<CardControlsProps> = ({
  name,
  setName,
  tone,
  setTone,
  isGenerating,
  onGenerate,
  onImageUpload,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-gray-100 no-print">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-yellow-500" />
          Customize Card
        </h2>
        <p className="text-sm text-gray-500">Personalize the details for your colleague.</p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Colleague's Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="Mir Hussain"
          />
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message Tone</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(WishTone).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                  tone === t
                    ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin" size={18} />
              Writing Magic...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Wish with Gemini
            </>
          )}
        </button>

        <hr className="border-gray-100" />

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Change Photo</label>
          <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 group-hover:text-purple-500">
              <Upload size={24} className="mb-1" />
              <p className="text-xs">Click to upload photo</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={onImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CardControls;