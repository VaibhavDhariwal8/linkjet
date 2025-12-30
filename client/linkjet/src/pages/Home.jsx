import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ShortenBox from "../components/urls/ShortenBox";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* HERO SECTION */}
      <section className="text-center pt-56 pb-20 px-4">
        <div class="inline-flex items-center gap-2 mb-10 bg-white border border-gray-100 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
          <span class="bg-black text-white px-1.5 py-0.5 rounded text-[8px] mr-1">
            NEW
          </span>
          Make your links feel special with custom shortcodes
        </div>

        <h1 class="text-5xl md:text-[78px] font-extrabold tracking-tight leading-[1.05] text-[#121212] mb-8">
          A link shortener that <br />
          works like an <span class="pill-highlight">Optimizer</span>
        </h1>

        <p class="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium mb-12">
          Great brands deserve a system that does it all, from making links and{" "}
          <br class="hidden md:block" /> smooth redirects to helping you track
          performance.
        </p>

        <ShortenBox />
      </section>

      {/* 3-STEP SECTION (Cards with animations) */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-12">
        <div className="glass-card p-10 rounded-[40px] cursor-default">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Step 1:
          </p>
          <h3 className="font-bold text-xl mb-3">Set up in minutes</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Paste it, name it, and you're done. No complex dashboards.
          </p>
          <div className="h-12 w-full bg-teal-50 rounded-xl border border-teal-100 flex items-center px-4 font-bold text-teal-600 text-xs italic">
            linkjet.co/event-2025
          </div>
        </div>

        <div className="glass-card p-10 rounded-[40px] cursor-default">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Step 2:
          </p>
          <h3 className="font-bold text-xl mb-3">Add rules & promo</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Add custom redirection rules and payment links like a pro.
          </p>
          <div className="flex gap-2">
            <div className="w-full h-8 bg-gray-100 rounded-lg"></div>
            <div className="w-12 h-8 bg-black rounded-lg"></div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[40px] cursor-default">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Step 3:
          </p>
          <h3 className="font-bold text-xl mb-3">Watch the growth</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Share your link and watch the real-time sales fly in.
          </p>
          <div className="flex items-end gap-1 h-12">
            <div className="w-1/4 bg-teal-200 h-6 rounded-t-md"></div>
            <div className="w-1/4 bg-teal-300 h-10 rounded-t-md"></div>
            <div className="w-1/4 bg-teal-500 h-12 rounded-t-md"></div>
            <div className="w-1/4 bg-teal-100 h-4 rounded-t-md"></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
