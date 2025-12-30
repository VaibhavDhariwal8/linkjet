const StatsGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Total Clicks
          </p>
          <h2 className="text-2xl font-black">12,842</h2>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Active Links
          </p>
          <h2 className="text-2xl font-black">48</h2>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Top Region
          </p>
          <h2 className="text-2xl font-black">India 🇮🇳</h2>
        </div>
      </div>
    </>
  );
};

export default StatsGrid;
