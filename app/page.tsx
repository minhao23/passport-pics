// app/passport-maker/page.tsx
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Switchboard } from "@/components/Switchboard";

export default function PassportPage() {
  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-green-500/30">
      <BackgroundGrid />
      <Switchboard />

      {/* Top Navigation (Copilot Style) */}
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

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: The Placeholder for Diagrams */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-[4/3] bg-[#0d1117] border border-white/10 rounded-lg flex flex-col items-center justify-center p-12 text-center">
              <h1 className="text-2xl font-mono text-gray-500 mb-4">&lt;IMAGE_PLACEHOLDER&gt;</h1>
              <p className="text-gray-400 text-sm max-w-xs">
                Your passport flow diagrams and upload illustrations will go here.
              </p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Command your <span className="text-green-400">Passport.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                AI-powered compliance for every country workflow, from the editor to the enterprise.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Country</label>
                <select className="w-full bg-black border border-white/20 rounded-md p-3 focus:border-green-500 outline-none transition">
                  <option>India</option>
                  <option>USA</option>
                  <option>United Kingdom</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Photo Type</label>
                {[
                  "Passport 3.5 x 4.5 cm (India)",
                  "Passport 2 x 2 inch (USA)",
                  "Visa 2 x 2 inch",
                ].map((type, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition">
                    <input type="radio" name="type" className="accent-green-500" defaultChecked={i === 0} />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>

              <button className="w-full py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-md transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                Start Generating →
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}