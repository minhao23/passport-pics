'use client'; 

import React, { useState, useRef } from 'react';
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Switchboard } from "@/components/Switchboard";

import { processPassportImage } from "@/app/api"; 
import { countries } from "@/utils/countries";

export default function PassportPage() {
  // --- STATE MANAGEMENT ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("Singapore");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show local preview
      setResultUrl(null); // Clear previous results
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError("Please upload a photo first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const processedUrl = await processPassportImage(selectedFile, country);
      setResultUrl(processedUrl);
    } catch (err: any) {
      setError(err.message || "An error occurred while processing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-green-500/30">
      <BackgroundGrid />
      <Switchboard />

      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <span className="font-bold tracking-tighter text-xl">123Passport</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <span className="text-white border-b border-green-500">1. Select Country</span>
            <span>2. Upload Photo</span>
            <span>3. Crop & Edit</span>
          </div>
        </div>
        <button className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition">
          Docs
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: The Image Preview Area */}
          <div className="relative group ">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-[4/3] bg-[#0d1117] border border-white/10 rounded-lg flex flex-col items-center justify-center p-2 text-center overflow-hidden">
              
              {isLoading ? (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-green-400 font-mono">Processing...</p>
                </div>
              ) : resultUrl ? (
                // Show the processed image from the backend
                <img src={resultUrl} alt="Processed Passport" className="w-full h-full object-contain rounded" />
              ) : previewUrl ? (
                // Show the raw uploaded image before processing
                <img src={previewUrl} alt="Original" className="w-full h-full object-contain rounded opacity-50" />
              ) : (
                // Your original placeholder
                <div className="p-12">
                  <h1 className="text-2xl font-mono text-gray-500 mb-4">&lt;IMAGE_PLACEHOLDER&gt;</h1>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    Upload an image to see the preview here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Command your <span className="text-green-400">Passport.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Create your passport photo in seconds. Just upload a selfie!
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-6">
              
              {/* File Upload Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Source Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-black border border-white/20 border-dashed rounded-md p-4 text-gray-400 hover:text-white hover:border-green-500 transition outline-none"
                >
                  {selectedFile ? selectedFile.name : "+ Click to Upload Photo"}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Country</label>
                <select 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-md p-3 focus:border-green-500 outline-none transition">
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>


              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleGenerate}
                disabled={!selectedFile || isLoading}
                className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400 text-black font-bold rounded-md transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? "Processing..." : "Start Generating →"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}