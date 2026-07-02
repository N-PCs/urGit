
import React from 'react';
import { ProfileData, GitHubStats, Theme } from '../types';
import { Github, MapPin, Mail, ExternalLink, Zap, Heart, LayoutGrid, BarChart3, Code, Award, Star, Twitter, Linkedin, Youtube, Instagram, MoreHorizontal } from 'lucide-react';

interface PreviewProps {
  profileData: ProfileData;
  githubStats: GitHubStats | null;
  theme: Theme;
}

const SocialIcons: React.FC<{ data: ProfileData }> = ({ data }) => {
  const socialList = [
    { id: 'github', icon: Github, value: data.github, url: `https://github.com/${data.github}` },
    { id: 'linkedin', icon: Linkedin, value: data.linkedin, url: `https://linkedin.com/in/${data.linkedin}` },
    { id: 'twitter', icon: Twitter, value: data.twitter, url: `https://twitter.com/${data.twitter}` },
    { id: 'instagram', icon: Instagram, value: data.instagram, url: `https://instagram.com/${data.instagram}` },
    { id: 'youtube', icon: Youtube, value: data.youtube, url: `https://youtube.com/@${data.youtube}` },
    { id: 'reddit', icon: MoreHorizontal, label: 'Reddit', value: data.reddit, url: `https://reddit.com/u/${data.reddit}` },
    { id: 'stackoverflow', icon: Code, label: 'StackOverflow', value: data.stackoverflow, url: `https://stackoverflow.com/users/${data.stackoverflow}` },
  ].filter(s => s.value);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {socialList.map(social => (
        <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-500/10 hover:bg-blue-500/20 transition-all">
          <social.icon size={18} />
        </a>
      ))}
    </div>
  );
};

export const StandardPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700" style={{ color: theme.text }}>
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tighter" style={{ color: theme.primary }}>
          Hi 👋, I'm {profileData.name || 'Your Name'}
        </h2>
        <p className="text-xl font-bold opacity-80">{profileData.title || 'Full Stack Developer'}</p>
        <div className="flex justify-center gap-6 text-sm opacity-60">
           {profileData.location && <div className="flex items-center gap-1"><MapPin size={14} /> {profileData.location}</div>}
           {profileData.email && <div className="flex items-center gap-1"><Mail size={14} /> {profileData.email}</div>}
        </div>
        <SocialIcons data={profileData} />
      </div>

      <div className="p-8 rounded-3xl border border-dashed" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
        <p className="text-lg leading-relaxed text-center italic opacity-90">
          "{profileData.bio || 'Building scalability and beauty.'}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2" style={{ color: theme.primary }}>
            <Zap size={16} /> Current Journey
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Working on <b>{profileData.currentWork}</b></li>
            <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Learning <b>{profileData.learning}</b></li>
          </ul>
        </div>

        {profileData.showStats && (
          <div className="space-y-4">
            <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" className="w-full" />
            <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" className="w-full" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2" style={{ color: theme.primary }}>
          <Code size={16} /> Tech Stack
        </h3>
        <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
      </div>

      <div className="flex flex-col gap-6">
        {profileData.showStreak && (
          <div className="flex justify-center">
            <img 
              src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} 
              alt="GitHub Streak" 
              className="max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export const MinimalPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="max-w-2xl mx-auto space-y-12 py-10" style={{ color: theme.text }}>
    <header className="space-y-2 border-l-4 pl-8" style={{ borderColor: theme.primary }}>
      <h2 className="text-5xl font-black tracking-tighter">{profileData.name}</h2>
      <p className="text-xl font-bold opacity-50">{profileData.title}</p>
    </header>
    
    <p className="text-2xl font-medium leading-tight opacity-80">{profileData.bio}</p>
    
    <div className="grid grid-cols-2 gap-10 pt-10 border-t" style={{ borderColor: `${theme.secondary}33` }}>
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Connect</h3>
        <SocialIcons data={profileData} />
      </div>
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Location</h3>
        <p className="text-sm font-bold">{profileData.location || "Earth"}</p>
      </div>
    </div>

    <div className="space-y-8 pt-10 border-t" style={{ borderColor: `${theme.secondary}33` }}>
       <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Tech Stack</h3>
       <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
       
       {profileData.showStats && (
         <div className="space-y-4 pt-4">
           <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" />
           <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" />
         </div>
       )}
    </div>
  </div>
);

export const StatsHeavyPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="space-y-10" style={{ color: theme.text }}>
    <div className="flex items-center justify-between">
      <div>
         <h2 className="text-2xl font-black tracking-tight">{profileData.github}'s Lab</h2>
         <SocialIcons data={profileData} />
      </div>
      <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500 text-white">System: Active</div>
    </div>

    {profileData.showStats && (
      <>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Stars', value: githubStats?.totalStars || 0, icon: Star, color: 'text-yellow-500' },
            { label: 'Rating', value: githubStats?.rating || '?', icon: Award, color: 'text-blue-500' },
            { label: 'Repos', value: '28', icon: LayoutGrid, color: 'text-emerald-500' }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-3xl border text-center space-y-2" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
              <div className={`flex justify-center ${s.color}`}><s.icon size={24} /></div>
              <div className="text-3xl font-black tracking-tighter">{s.value}</div>
              <div className="text-[10px] uppercase font-black opacity-40">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="p-10 rounded-[3rem] border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
           <h3 className="text-sm font-black uppercase tracking-widest text-center mb-8">🛠 Tech Stack</h3>
           <div className="flex justify-center">
             <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
           </div>
        </div>

        <div className="p-10 rounded-[3rem] border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
           <h3 className="text-sm font-black uppercase tracking-widest text-center mb-8">Language Distribution</h3>
           <div className="w-full h-8 rounded-2xl overflow-hidden flex shadow-inner">
              {githubStats?.topLanguages.map((l, i) => (
                <div key={i} style={{ width: `${l.percentage}%`, backgroundColor: l.color }}></div>
              ))}
           </div>
           <div className="grid grid-cols-3 gap-6 mt-8">
              {githubStats?.topLanguages.map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }}></div>
                  <span className="text-xs font-bold">{l.name}</span>
                  <span className="text-xs opacity-40">{l.percentage}%</span>
                </div>
              ))}
           </div>
        </div>
      </>
    )}

    {profileData.showStreak && (
      <div className="flex justify-center py-6">
        <img 
          src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} 
          alt="GitHub Streak" 
        />
      </div>
    )}
  </div>
);

export const CreativePreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="text-center space-y-16" style={{ color: theme.text }}>
     <div className="space-y-6">
        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500">
           <div className={`px-8 py-3 rounded-full font-black text-xl bg-white dark:bg-slate-900`}>
              ✨ {profileData.name} ✨
           </div>
        </div>
        <h2 className="text-5xl font-black italic tracking-tighter">{profileData.title}</h2>
     </div>

     <div className="flex justify-center mb-8">
        <img src={`https://komarev.com/ghpvc/?username=${profileData.github}&label=Profile%20views&color=0e75b6&style=flat`} alt="Viewer Count" />
     </div>

     <div className="space-y-8">
        <h2 className="text-2xl font-black uppercase tracking-widest">🛠 Tech Stack</h2>
        <div className="flex justify-center">
          <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
        </div>
     </div>

     <div className="flex justify-center mt-12">
        <img src={`https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical`} alt="Quote" className="max-w-full" />
     </div>

      <SocialIcons data={profileData} />

      {profileData.showStats && (
        <div className="space-y-8 pt-8">
          <div className="flex justify-center gap-4 flex-wrap">
            <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="GitHub Stats" />
          </div>
        </div>
      )}

      {profileData.showStreak && (
        <div className="flex justify-center pt-8">
          <img src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} alt="GitHub Streak" />
        </div>
      )}
  </div>
);

export const CompactPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="p-8 rounded-[2.5rem] border shadow-2xl overflow-hidden relative" style={{ borderColor: `${theme.secondary}33`, backgroundColor: theme.background }}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
    <div className="flex items-start justify-between mb-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: theme.primary }}>{profileData.name}</h2>
        <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{profileData.title}</p>
      </div>
      <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500"><Github size={24}/></div>
    </div>
    <p className="text-sm font-medium mb-8 leading-relaxed opacity-80">{profileData.bio}</p>
    <div className="space-y-4 mb-8">
       <div className="text-[10px] font-black uppercase opacity-40">Tech Stack</div>
       <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
    </div>
    
    {profileData.showStats && (
      <div className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: `${theme.secondary}33` }}>
         <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true&layout=compact`} alt="Stats" />
      </div>
    )}
  </div>
);

export const AcademicPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="font-serif space-y-10" style={{ color: theme.text }}>
     <div className="border-b-2 pb-6" style={{ borderColor: theme.primary }}>
        <h2 className="text-4xl font-bold tracking-tight mb-2">{profileData.name}</h2>
        <p className="text-lg opacity-60 italic">{profileData.title}</p>
        {profileData.location && <p className="text-sm opacity-50 mt-1">📍 {profileData.location}</p>}
     </div>
     <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
           <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Research Statement</h3>
              <p className="leading-relaxed opacity-80">{profileData.bio}</p>
           </section>
           <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Recent Publications</h3>
              <div className="p-5 rounded-xl border italic text-sm opacity-60">No recent publications registered in repository metadata.</div>
           </section>
        </div>
        <div className="md:col-span-4 space-y-8">
           <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] border-b pb-2">Digital Networks</h4>
              <SocialIcons data={profileData} />
           </div>
           
           {profileData.showStats && (
             <div className="space-y-4">
                <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" className="w-full" />
                <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" className="w-full" />
             </div>
           )}
        </div>
     </div>
  </div>
);

export const DeveloperPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="space-y-10" style={{ color: theme.text }}>
     <div className="flex items-end justify-between">
        <div className="flex items-end gap-6">
           <img src={`https://github.com/${profileData.github}.png`} className="w-32 h-32 rounded-3xl border-4" style={{ borderColor: theme.primary }} alt="avatar" />
           <div className="pb-2 space-y-1">
              <h2 className="text-3xl font-black tracking-tighter">{profileData.name}</h2>
              <div className="flex items-center gap-2 text-blue-500">
                 <Code size={16} />
                 <span className="text-xs font-black uppercase tracking-widest">{profileData.title}</span>
              </div>
           </div>
        </div>
        <SocialIcons data={profileData} />
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="p-8 rounded-[2rem] border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><LayoutGrid size={16}/> Pipeline</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-50">Currently building</span>
                    <span className="font-bold underline decoration-blue-500/30">{profileData.currentWork}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-50">Exploring</span>
                    <span className="font-bold underline decoration-emerald-500/30">{profileData.learning}</span>
                 </div>
              </div>
           </div>
        </div>
        <div className="space-y-6">
           {profileData.showStats && (
             <div className="p-8 rounded-[2rem] border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><BarChart3 size={16}/> Performance</h3>
                <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" className="w-full" />
                <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" className="w-full mt-4" />
             </div>
           )}
           {profileData.showStreak && (
              <div className="p-8 rounded-[2rem] border border-dashed text-center" style={{ borderColor: `${theme.secondary}33` }}>
                 <img src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} alt="Streak" className="w-full" />
              </div>
           )}
        </div>
     </div>
  </div>
);

export const DarkElegantPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="text-center py-20 px-10 relative overflow-hidden" style={{ color: theme.text }}>
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
     
     <h2 className="text-6xl font-black tracking-tighter mb-4 scale-y-110">{profileData.name}</h2>
     <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 mb-12">{profileData.title}</p>
     
     <div className="max-w-xl mx-auto border-y py-12 px-8 my-12" style={{ borderColor: `${theme.secondary}33` }}>
        <p className="text-2xl font-light italic leading-relaxed opacity-90">{profileData.bio}</p>
     </div>

     <div className="space-y-12">
        <div className="space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest opacity-40">🛠 Tech Stack</h3>
           <div className="flex justify-center">
              <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
           </div>
        </div>
        
        {profileData.showStats && (
          <div className="flex flex-col items-center gap-6">
            <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" />
            <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" />
          </div>
        )}
        {profileData.showStreak && (
          <div className="flex justify-center">
            <img src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} alt="Streak" />
          </div>
        )}
      </div>

     <div className="mt-12">
        <SocialIcons data={profileData} />
     </div>
  </div>
);

export const CommunityPreview: React.FC<PreviewProps> = ({ profileData, githubStats, theme }) => (
  <div className="space-y-12" style={{ color: theme.text }}>
     <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xl">
           <Zap size={40} fill="currentColor" />
        </div>
        <div className="flex-1">
           <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              Community Spirit <Heart size={24} className="text-rose-500 fill-rose-500" />
           </h2>
           <p className="font-bold opacity-60">Powering Open Source | {profileData.name}</p>
        </div>
        <SocialIcons data={profileData} />
     </div>

     <div className="p-12 rounded-[4rem] border-4 border-dashed" style={{ borderColor: `${theme.primary}44` }}>
        <p className="text-3xl font-black leading-tight mb-8">
           "{profileData.bio}"
        </p>
        <div className="space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-blue-500">🛠 Technical Skills</h3>
           <div className="flex justify-center">
              <img src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${theme.id.includes('light') ? 'light' : 'dark'}`} alt="Skills" />
           </div>
        </div>
     </div>

     <div className="grid grid-cols-2 gap-8 mt-12">
        {profileData.showTrophies && (
          <div className="p-8 rounded-[3rem] border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
             <h3 className="text-xs font-black uppercase tracking-widest mb-6">World View Impact</h3>
             <div className="space-y-6">
                <div className="w-full bg-slate-500/10 h-3 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-full w-[80%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase opacity-40">
                   <span>Community Interaction</span>
                   <span>80% Reach</span>
                </div>
             </div>
          </div>
        )}
        {profileData.showStats && (
          <div className="p-8 rounded-[3rem] border flex flex-col items-center gap-6" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
             <h3 className="text-xs font-black uppercase tracking-widest mb-2">Git Influence</h3>
             <img src={`https://github-readme-stats-fast.vercel.app/api?username=${profileData.github}&show_icons=true&theme=${profileData.statsTheme}&hide_border=true`} alt="Stats" />
             <img src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${profileData.github}&layout=compact&theme=${profileData.statsTheme}&hide_border=true`} alt="Top Languages" />
          </div>
        )}
      </div>

      {profileData.showStreak && (
        <div className="flex justify-center py-8">
           <img src={`https://streak-stats.demolab.com/?user=${profileData.github}&theme=${profileData.statsTheme}&hide_border=true`} alt="Streak" />
        </div>
      )}

     {profileData.showStreak && (
        <div className="p-8 rounded-[3rem] border border-dashed text-center opacity-40" style={{ borderColor: `${theme.secondary}33` }}>
           <Zap size={24} className="mx-auto mb-3 text-orange-500" />
           <span className="text-xs font-black uppercase tracking-[0.2em]">Contribution Momentum Tracker</span>
        </div>
     )}
  </div>
);
