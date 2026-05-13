
export const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* The Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      
      {/* The Switchboard Grid */}
      <div 
        className="grid opacity-20" 
        style={{ 
          gridTemplateColumns: 'repeat(18, 1fr)', 
          gap: '1px',
          width: '100vw' 
        }}
      >
        {Array.from({ length: 180 }).map((_, i) => (
          <div 
            key={i}
            className="h-12 w-full border-[0.5px] border-white/5 transition-colors duration-500 hover:bg-white/10"
            style={{
                backgroundColor: Math.random() > 0.98 ? 'rgba(255,255,255,0.05)' : 'transparent'
            }}
          />
        ))}
      </div>
    </div>
  );
};