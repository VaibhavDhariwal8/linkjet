const StatsGrid = ({ urls, topRegion }) => {
  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks ?? 0), 0);

  const activeLinks = urls.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="glass-panel p-6 rounded-3xl">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Total Clicks
        </p>
        <h2 className="text-2xl font-black">{totalClicks}</h2>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Active Links
        </p>
        <h2 className="text-2xl font-black">{activeLinks}</h2>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Top Region
        </p>
        <h2 className="text-2xl font-black">{topRegion?.country ?? "—"}</h2>
      </div>
    </div>
  );
};

export default StatsGrid;
