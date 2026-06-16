import { BookOpen, Users, ShieldAlert, GraduationCap, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30" style={{ backgroundColor: '#010114' }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          100% Free Open-Learning Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">
          Empowering Myanmar through <br />
          Free Education
        </h1>
        
        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-8">
          SkillHub MM is a community-driven platform that connects expert instructors with 
          eager learners, providing 100% free access to high-quality education.
        </p>

        {/* Updated Button Color */}
        <button className="px-8 py-3 rounded-xl font-semibold text-sm bg-blue-600 text-white shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-all active:scale-95">
          Join SkillHub Free
        </button>
      </section>

      {/* 2. OUR MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Our Mission</h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b0b24] border border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Globe size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">100% Free & Open</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No hidden fees. Enjoy unlimited, unrestricted access to all lessons and educational blog content.
            </p>
          </div>

          <div className="bg-[#0b0b24] border border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Award size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Learn from passionate professionals and subject-matter experts in IT, languages, and more.
            </p>
          </div>

          <div className="bg-[#0b0b24] border border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Users size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              A non-profit learning ecosystem where knowledge is shared and built collaboratively by the community.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How SkillHub MM Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Students", icon: <GraduationCap size={28} />, color: "blue" },
            { title: "Teachers", icon: <BookOpen size={26} />, color: "blue" },
            { title: "Admins", icon: <ShieldAlert size={26} />, color: "blue" }
          ].map((role, i) => (
            <div key={i} className="bg-[#05051a]/60 border border-slate-800/40 p-6 rounded-2xl text-center">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-4">
                {role.icon}
              </div>
              <h4 className="text-md font-bold text-white mb-2">{role.title}</h4>
            </div>
          ))}
        </div>
      </section> 
      
      {/* 4. STATISTICS */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-16">
        <div className="bg-gradient-to-r from-blue-950/40 to-slate-900/20 border border-slate-800 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">10,000+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Students</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">50+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Teachers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">100+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Courses</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">5+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Categories</div>
          </div>
        </div>
      </section>
      
    </div>
  );
}