
import React, { useState, useEffect, useMemo } from 'react';
import { Github, Edit3, Layers, Sparkles, Copy, Check, ExternalLink, Menu, X, Heart, Code, Twitter, Linkedin, Mail, MapPin, Send, Cpu, Award, Zap, Palette, ChevronRight, LayoutGrid, BarChart3, Star, GitBranch, GitPullRequest, Info, Search } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import { ProfileData, Theme, GitHubStats, LeetCodeStats, CodeforcesStats } from './types';
import { THEMES, TEMPLATES, INITIAL_PROFILE_DATA, SKILL_OPTIONS } from './constants';
import { generateMarkdown } from './services/markdownGenerator';

import { fetchGitHubStats } from './services/githubService';
import { fetchLeetCodeStats } from './services/leetcodeService';
import { fetchCodeforcesStats } from './services/codeforcesService';
import GithubMarkdownPreview from './components/GithubMarkdownPreview';

import { useProfile } from './hooks/useProfile';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('urgit_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });
  const [activeTab, setActiveTab] = useState<'builder' | 'templates'>('builder');
  const { profileData, setProfileData, updateProfile, toggleSkill } = useProfile();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(TEMPLATES[0].id);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [apiStats, setApiStats] = useState<GitHubStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [lcLoading, setLcLoading] = useState(false);
  const [cfStats, setCfStats] = useState<CodeforcesStats | null>(null);
  const [cfLoading, setCfLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const [skillsDrawerOpen, setSkillsDrawerOpen] = useState(false);
  const [socialDrawerOpen, setSocialDrawerOpen] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('urgit_selected_theme_id');
    if (savedThemeId) {
      const theme = THEMES.find(t => t.id === savedThemeId);
      if (theme) setSelectedTheme(theme);
    }

    const savedActiveTab = localStorage.getItem('urgit_active_tab');
    if (savedActiveTab === 'builder' || savedActiveTab === 'templates') {
      setActiveTab(savedActiveTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('urgit_selected_theme_id', selectedTheme.id);
  }, [selectedTheme]);

  useEffect(() => {
    localStorage.setItem('urgit_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('urgit_dark_mode', String(isDark));
  }, [isDark]);
  const fetchStats = async () => {
    if (profileData.github) {
      setStatsLoading(true);
      const stats = await fetchGitHubStats(profileData.github);
      setApiStats(stats);
      setStatsLoading(false);
    }
  };

  const fetchLcStats = async () => {
    if (profileData.leetcode) {
      setLcLoading(true);
      const stats = await fetchLeetCodeStats(profileData.leetcode);
      setLcStats(stats);
      setLcLoading(false);
    }
  };

  const fetchCfStats = async () => {
    if (profileData.codeforces) {
      setCfLoading(true);
      const stats = await fetchCodeforcesStats(profileData.codeforces);
      setCfStats(stats);
      setCfLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchStats, 1000);
    return () => clearTimeout(debounce);
  }, [profileData.github]);

  useEffect(() => {
    const debounce = setTimeout(fetchLcStats, 1000);
    return () => clearTimeout(debounce);
  }, [profileData.leetcode]);

  useEffect(() => {
    const debounce = setTimeout(fetchCfStats, 1000);
    return () => clearTimeout(debounce);
  }, [profileData.codeforces]);

  useEffect(() => {
    const themeMap: Record<string, string> = {
      'github-dark': 'dark',
      'dracula': 'dracula',
      'nord': 'nord',
      'tokyo-night': 'tokyonight',
      'one-dark': 'onedark',
      'monokai': 'monokai',
      'cyberpunk': 'cyberpunk',
      'github-light': 'light'
    };
    updateProfile('statsTheme', themeMap[selectedTheme.id] || 'dark');
  }, [selectedTheme]);

  const markdown = useMemo(() => {
    return generateMarkdown(profileData, selectedTemplate);
  }, [profileData, selectedTemplate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSkills = useMemo(() => {
    return SKILL_OPTIONS.filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()));
  }, [skillSearch]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans selection:bg-blue-500/30 overflow-x-hidden`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-40 w-full border-b backdrop-blur-md ${isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-2xl shadow-blue-500/40 transform -rotate-6">
                <Github className="text-white" size={28} />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter block leading-none">urGit</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Profiles</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
                {[
                  { id: 'builder', icon: Edit3, label: 'Builder' },
                  { id: 'templates', icon: Layers, label: 'Templates' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === item.id 
                        ? (isDark ? 'bg-slate-800 text-blue-400 shadow-xl' : 'bg-white text-blue-600 shadow-sm')
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Drawer (Slide Menu) */}
      <div className={`fixed inset-y-0 right-0 w-80 z-50 transform ${themeDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out border-l shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black flex items-center gap-2"><Palette className="text-blue-500" /> Themes</h3>
               <button onClick={() => setThemeDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
               {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${selectedTheme.id === theme.id ? 'border-blue-500 bg-blue-500/10' : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <div className="flex flex-col items-start">
                       <span className={`text-sm font-black ${selectedTheme.id === theme.id ? 'text-blue-500' : ''}`}>{theme.name}</span>
                    </div>
                    <div className="flex -space-x-1">
                       <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.primary }}></div>
                       <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.accent }}></div>
                    </div>
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Social Links Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 z-50 transform ${socialDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out border-l shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black flex items-center gap-2"><Send className="text-blue-500" /> Social Links</h3>
               <button onClick={() => setSocialDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-5">
                {[
                 { id: 'linkedin', label: 'LinkedIn Username', icon: Linkedin },
                 { id: 'twitter', label: 'Twitter Handle', icon: Twitter },
                 { id: 'reddit', label: 'Reddit Username', icon: Search },
                 { id: 'stackoverflow', label: 'StackOverflow ID', icon: Code },
                 { id: 'instagram', label: 'Instagram Handle', icon: Palette },
                 { id: 'youtube', label: 'YouTube Channel', icon: Cpu },
                 { id: 'leetcode', label: 'LeetCode Username', icon: Star },
                 { id: 'codeforces', label: 'Codeforces Handle', icon: BarChart3 },
               ].map(social => (
                 <div key={social.id} className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                     <social.icon size={12} /> {social.label}
                   </label>
                   <input 
                      value={profileData[social.id as keyof ProfileData] as string}
                      onChange={(e) => updateProfile(social.id as any, e.target.value)}
                      placeholder="Your handle..."
                      className={`w-full px-4 py-3 rounded-2xl border transition-all outline-none text-sm ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`} 
                   />
                 </div>
               ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
               <button onClick={() => setSocialDrawerOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all active:scale-95">Save Changes</button>
            </div>
         </div>
      </div>

      {/* Skills Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 z-50 transform ${skillsDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out border-l shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black flex items-center gap-2"><Code className="text-emerald-500" /> Tech Stack</h3>
               <button onClick={() => setSkillsDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={24} /></button>
            </div>
            <div className="mb-4">
               <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <Search size={16} className="text-slate-400" />
                  <input
                     value={skillSearch}
                     onChange={(e) => setSkillSearch(e.target.value)}
                     placeholder="Search skills..."
                     className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                  />
               </div>
            </div>
            {profileData.skills.length > 0 && (
               <div className="mb-4 flex flex-wrap gap-2">
                  {profileData.skills.map(skill => (
                     <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
                     >
                        {skill} <X size={12} />
                     </button>
                  ))}
               </div>
            )}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
               <div className="grid grid-cols-2 gap-2">
                  {filteredSkills.map(skill => {
                     const isSelected = profileData.skills.includes(skill);
                     return (
                        <button
                           key={skill}
                           onClick={() => toggleSkill(skill)}
                           className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                              isSelected
                                 ? 'bg-blue-600 border-blue-600 text-white'
                                 : (isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600')
                           }`}
                        >
                           {skill}
                        </button>
                     );
                  })}
               </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
               <button onClick={() => setSkillsDrawerOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all active:scale-95">Save Changes</button>
            </div>
         </div>
      </div>

      {/* Backdrop for Drawers */}
      {(themeDrawerOpen || skillsDrawerOpen || socialDrawerOpen) && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => { setThemeDrawerOpen(false); setSkillsDrawerOpen(false); setSocialDrawerOpen(false); }}></div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className={`rounded-[2.5rem] p-8 md:p-10 shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <div className="space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Info size={20} /></div>
                      <h3 className="text-xl font-black">Professional Info</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Full Name</label>
                        <input value={profileData.name} onChange={(e) => updateProfile('name', e.target.value)} className={`w-full px-5 py-3.5 rounded-2xl border transition-all focus:ring-4 focus:ring-blue-500/10 outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">GitHub Username</label>
                        <div className="flex gap-2">
                          <input value={profileData.github} onChange={(e) => updateProfile('github', e.target.value)} className={`flex-1 px-5 py-3.5 rounded-2xl border transition-all focus:ring-4 focus:ring-blue-500/10 outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`} />
                          <button 
                            onClick={fetchStats}
                            disabled={statsLoading}
                            className={`p-3.5 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 hover:border-blue-500 text-blue-500' : 'bg-white border-slate-200 hover:border-blue-500 text-blue-600 shadow-sm'} ${statsLoading ? 'animate-pulse opacity-50' : 'active:scale-95'}`}
                          >
                            <Zap size={20} fill={statsLoading ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Actions (Slide Menu Triggers) */}
                  <section className="space-y-4">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Aesthetic Controls</h3>
                     <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => setThemeDrawerOpen(true)} className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                           <Palette className="text-blue-500 mb-2" size={20} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Theme</span>
                        </button>
                        <button onClick={() => setSkillsDrawerOpen(true)} className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                           <Code className="text-emerald-500 mb-2" size={20} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Stack</span>
                        </button>
                        <button onClick={() => setSocialDrawerOpen(true)} className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                           <Send className="text-rose-500 mb-2" size={20} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Socials</span>
                        </button>
                     </div>
                  </section>

                  <section className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500"><Zap size={20} /></div>
                        <h3 className="text-xl font-black">Dash Widgets</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'showStats', label: 'Core Stats', icon: BarChart3 },
                          { id: 'showTrophies', label: 'Trophies', icon: Award },
                          { id: 'showStreak', label: 'Streak Graph', icon: Zap },
                        ].map((w) => (
                          <button
                            key={w.id}
                            onClick={() => updateProfile(w.id as any, !profileData[w.id as keyof ProfileData])}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all font-bold text-sm ${
                              profileData[w.id as keyof ProfileData]
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xl'
                                : (isDark ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100')
                            }`}
                          >
                            <w.icon size={18} />
                            <span>{w.label}</span>
                          </button>
                        ))}
                      </div>
                  </section>

                  {/* Competitive Programming Stats */}
                  <section className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500"><Star size={20} /></div>
                        <h3 className="text-xl font-black">CP Stats</h3>
                     </div>

                     {/* LeetCode Stats */}
                     {profileData.leetcode && (
                        <div className={`rounded-3xl border p-6 space-y-4 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm font-black text-amber-500">LeetCode</span>
                                 <span className="text-[10px] font-bold text-slate-400">@{profileData.leetcode}</span>
                              </div>
                              <button onClick={fetchLcStats} disabled={lcLoading} className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">
                                 {lcLoading ? '...' : 'Refresh'}
                              </button>
                           </div>
                           {lcStats ? (
                              <div className="grid grid-cols-3 gap-3">
                                 <div className="text-center p-3 rounded-2xl bg-emerald-500/10">
                                    <div className="text-lg font-black text-emerald-500">{lcStats.totalSolved}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Solved</div>
                                 </div>
                                 <div className="text-center p-3 rounded-2xl bg-blue-500/10">
                                    <div className="text-lg font-black text-blue-500">#{lcStats.ranking.toLocaleString()}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Rank</div>
                                 </div>
                                 <div className="text-center p-3 rounded-2xl bg-rose-500/10">
                                    <div className="text-lg font-black text-rose-500">{lcStats.hardSolved}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Hard</div>
                                 </div>
                              </div>
                           ) : (
                              <div className="text-center py-4 text-sm text-slate-400">
                                 {lcLoading ? 'Fetching stats...' : 'No stats loaded'}
                              </div>
                           )}
                        </div>
                     )}

                     {/* Codeforces Stats */}
                     {profileData.codeforces && (
                        <div className={`rounded-3xl border p-6 space-y-4 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm font-black text-blue-400">Codeforces</span>
                                 <span className="text-[10px] font-bold text-slate-400">@{profileData.codeforces}</span>
                              </div>
                              <button onClick={fetchCfStats} disabled={cfLoading} className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">
                                 {cfLoading ? '...' : 'Refresh'}
                              </button>
                           </div>
                           {cfStats ? (
                              <div className="grid grid-cols-3 gap-3">
                                 <div className="text-center p-3 rounded-2xl bg-blue-500/10">
                                    <div className="text-lg font-black text-blue-500">{cfStats.rating}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Rating</div>
                                 </div>
                                 <div className="text-center p-3 rounded-2xl bg-purple-500/10">
                                    <div className="text-lg font-black text-purple-500 capitalize">{cfStats.rank}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Rank</div>
                                 </div>
                                 <div className="text-center p-3 rounded-2xl bg-emerald-500/10">
                                    <div className="text-lg font-black text-emerald-500">{cfStats.totalSolved}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Solved</div>
                                 </div>
                              </div>
                           ) : (
                              <div className="text-center py-4 text-sm text-slate-400">
                                 {cfLoading ? 'Fetching stats...' : 'No stats loaded'}
                              </div>
                           )}
                        </div>
                     )}

                     {!profileData.leetcode && !profileData.codeforces && (
                        <p className="text-xs text-slate-400 text-center py-2">Add usernames in Socials to see CP stats</p>
                     )}
                  </section>
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-7 space-y-10">
              <div className={`rounded-[3rem] shadow-2xl border overflow-hidden ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
                <div className={`px-10 py-6 flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className="flex space-x-2">
                       <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></div>
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Simulation Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsFullscreen(true)}
                      className={`p-3 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500 text-slate-400 hover:text-blue-500' : 'bg-white border-slate-100 hover:border-blue-500 text-slate-500 shadow-sm'} active:scale-95`}
                      title="Full Screen Preview"
                    >
                      <ExternalLink size={20} />
                    </button>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black transition-all active:scale-95 shadow-2xl shadow-blue-500/40"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                      <span>{copied ? 'Copied' : 'Copy MD'}</span>
                    </button>
                  </div>
                </div>

                <div 
                  className="p-12 md:p-16 max-h-[800px] overflow-y-auto transition-all duration-700 custom-scrollbar relative"
                  style={{ backgroundColor: isDark ? selectedTheme.background : '#ffffff' }}
                >
                  {statsLoading && (
                    <div className="absolute inset-0 z-10 bg-black/5 backdrop-blur-[2px] flex items-center justify-center">
                       <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Syncing GitHub Data...</span>
                       </div>
                    </div>
                  )}
                  <GithubMarkdownPreview markdown={markdown} />
                </div>

                <div className={`p-10 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'} border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Generated Markdown Source</span>
                    </div>
                    <button onClick={handleCopy} className="text-slate-400 hover:text-blue-600 transition-colors"><Copy size={16} /></button>
                  </div>
                  <div className="max-h-40 overflow-y-auto mono custom-scrollbar">
                    <pre className="text-[12px] text-blue-500/70 leading-relaxed whitespace-pre-wrap selection:bg-blue-500 selection:text-white">
                      {markdown}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {TEMPLATES.map((template) => (
              <div key={template.id} onClick={() => { setSelectedTemplate(template.id); setActiveTab('builder'); }} className={`group cursor-pointer rounded-[3.5rem] overflow-hidden border-2 transition-all hover:scale-[1.03] active:scale-95 ${selectedTemplate === template.id ? 'border-blue-500 ring-[12px] ring-blue-500/5 shadow-2xl' : (isDark ? 'border-slate-800 bg-slate-900 hover:border-slate-600' : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm')}`}>
                <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                   <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out grayscale-[0.3] group-hover:grayscale-0" />
                   {selectedTemplate === template.id && (
                     <div className="absolute top-8 right-8 bg-blue-600 text-white p-3 rounded-[1.5rem] shadow-2xl">
                       <Check size={24} strokeWidth={3} />
                     </div>
                   )}
                </div>
                <div className="p-10 md:p-12">
                  <h3 className="font-black text-3xl mb-4 tracking-tighter">{template.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={`mt-20 border-t py-24 ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-2xl shadow-blue-500/40"><Github size={32} /></div>
              <span className="text-3xl font-black tracking-tighter">urGit</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">urGit empowers developers to build an identity, not just a profile. Choose handcrafted templates and visualize your journey with a professional real-time dashboard.</p>
          </div>
          <div className="flex flex-col md:items-end gap-10">
            <div className="flex flex-col items-start md:items-end gap-2">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Project Architect</p>
               <a href="https://github.com/N-PCs" className="group flex items-center gap-3">
                  <span className="text-xl font-black group-hover:text-blue-500 transition-colors underline decoration-blue-500/30">N-PCs / Neel Pandey</span>
                  <Heart size={20} className="text-rose-500 fill-rose-500 animate-pulse" />
               </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Screen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-slate-950 animate-in fade-in duration-500 flex flex-col">
          <div className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Github className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-white">urGit Full Preview</span>
            </div>
            <div className="flex items-center gap-4">
               <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black transition-all"
               >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? 'Copied' : 'Copy MD'}</span>
               </button>
               <button 
                  onClick={() => setIsFullscreen(false)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all active:scale-95"
               >
                  <X size={24} />
               </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 p-10 md:p-20 flex justify-center custom-scrollbar">
            <div className="max-w-4xl w-full">
               <GithubMarkdownPreview markdown={markdown} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f644; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f688; }
      `}</style>
    </div>
  );
};

export default App;
