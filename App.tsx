
import React, { useState, useEffect, useMemo } from 'react';
import { Github, Edit3, Layers, Sparkles, Copy, Check, ExternalLink, Menu, X, Heart, Code, Twitter, Linkedin, Mail, MapPin, Send, Cpu, Award, Zap, Palette, ChevronRight, LayoutGrid, BarChart3, Star, GitBranch, GitPullRequest, Info, Search } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import { ProfileData, Theme, GitHubStats } from './types';
import { THEMES, TEMPLATES, INITIAL_PROFILE_DATA, SKILL_OPTIONS } from './constants';
import { generateMarkdown } from './services/markdownGenerator';

const GitStatsDashboard: React.FC<{ github: string; name: string; location: string; theme: Theme }> = ({ github, name, location, theme }) => {
  const stats: GitHubStats = {
    totalStars: 5,
    totalCommits: 1068,
    totalPRs: 15,
    totalIssues: 40,
    contributedTo: 21,
    rating: 'B-',
    currentStreak: 40,
    longestStreak: 97,
    totalContributions: 1120,
    topLanguages: [
      { name: 'TypeScript', color: '#3178c6', percentage: 16.6 },
      { name: 'Python', color: '#3572A5', percentage: 7.2 },
      { name: 'Java', color: '#b07219', percentage: 5.7 },
      { name: 'C++', color: '#f34b7d', percentage: 4.1 },
      { name: 'PHP', color: '#4F5D95', percentage: 3.4 },
      { name: 'JavaScript', color: '#f1e05a', percentage: 6.0 },
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700" style={{ color: theme.text }}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight" style={{ color: theme.primary }}>{github}</h2>
        <p className="text-sm font-medium opacity-60">{name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Zap size={16} className="text-orange-500 fill-orange-500" />
            <span>{stats.totalCommits.toLocaleString()} contributions in the last 12 months</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <LayoutGrid size={16} className="text-blue-500" />
            <span>28 public repositories</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Heart size={16} className="text-rose-500" />
            <span>Joined GitHub 1 year ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-emerald-500" />
            <span>{location}</span>
          </div>
        </div>

        <div className="h-24 rounded-2xl border flex items-end justify-between px-4 py-2" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
           {[30, 45, 25, 60, 40, 75, 50, 85, 30, 20].map((h, i) => (
             <div key={i} className="w-4 bg-blue-500/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border relative" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black uppercase tracking-wider flex items-center gap-2" style={{ color: theme.primary }}>
              <BarChart3 size={16} /> GitHub Stats
            </h4>
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 flex items-center justify-center text-lg font-black" style={{ color: theme.primary }}>{stats.rating}</div>
          </div>
          <div className="space-y-3 text-xs font-bold opacity-80">
            <div className="flex justify-between"><span>Total Stars Earned</span> <span>{stats.totalStars}</span></div>
            <div className="flex justify-between"><span>Contributions (12mo)</span> <span>{stats.totalCommits}</span></div>
            <div className="flex justify-between"><span>Pull Requests (12mo)</span> <span>{stats.totalPRs}</span></div>
            <div className="flex justify-between"><span>Issues (12mo)</span> <span>{stats.totalIssues}</span></div>
            <div className="flex justify-between"><span>Contributed To (12mo)</span> <span>{stats.contributedTo}</span></div>
          </div>
        </div>

        <div className="p-6 rounded-3xl border" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
          <h4 className="text-sm font-black uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: theme.primary }}>
            <Code size={16} /> Most Used Languages
          </h4>
          <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
            {stats.topLanguages.map((lang, i) => (
              <div key={i} style={{ width: `${lang.percentage * 3}%`, backgroundColor: lang.color }}></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-bold">
            {stats.topLanguages.map((lang, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }}></div>
                  <span>{lang.name}</span>
                </div>
                <span className="opacity-60">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border text-center space-y-1" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
          <div className="text-2xl font-black text-blue-500">{stats.totalContributions.toLocaleString()}</div>
          <div className="text-[10px] uppercase font-black opacity-40">Total Contributions</div>
        </div>
        <div className="p-5 rounded-3xl border text-center space-y-1 relative" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2"><Zap size={14} className="text-orange-500" /></div>
          <div className="text-2xl font-black text-orange-500 pt-2">{stats.currentStreak}</div>
          <div className="text-[10px] uppercase font-black opacity-40">Current Streak</div>
        </div>
        <div className="p-5 rounded-3xl border text-center space-y-1" style={{ borderColor: `${theme.secondary}33`, backgroundColor: `${theme.primary}05` }}>
          <div className="text-2xl font-black text-emerald-500">{stats.longestStreak}</div>
          <div className="text-[10px] uppercase font-black opacity-40">Longest Streak</div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<'builder' | 'templates'>('builder');
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(TEMPLATES[0].id);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [copied, setCopied] = useState(false);
  
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const [skillsDrawerOpen, setSkillsDrawerOpen] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
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

  const updateProfile = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
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

      {/* Skills Drawer (Slide Menu) */}
      <div className={`fixed inset-y-0 right-0 w-96 z-50 transform ${skillsDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out border-l shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-black flex items-center gap-2"><Code className="text-blue-500" /> Tech Stack</h3>
               <button onClick={() => setSkillsDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={24} /></button>
            </div>
            <div className="relative mb-6">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  placeholder="Search 300+ icons..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-100 border-slate-200 focus:border-blue-500'}`}
               />
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-3 gap-2">
               {filteredSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${profileData.skills.includes(skill) ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20' : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <img src={`https://skillicons.dev/icons?i=${skill}`} alt={skill} className="w-8 h-8 rounded-lg" />
                    <span className={`text-[10px] font-bold truncate w-full text-center ${profileData.skills.includes(skill) ? 'text-white' : 'text-slate-400'}`}>{skill}</span>
                  </button>
               ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
               <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{profileData.skills.length} Selected</span>
               <button onClick={() => setSkillsDrawerOpen(false)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30">Done</button>
            </div>
         </div>
      </div>

      {/* Backdrop for Drawers */}
      {(themeDrawerOpen || skillsDrawerOpen) && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => { setThemeDrawerOpen(false); setSkillsDrawerOpen(false); }}></div>
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
                        <input value={profileData.github} onChange={(e) => updateProfile('github', e.target.value)} className={`w-full px-5 py-3.5 rounded-2xl border transition-all focus:ring-4 focus:ring-blue-500/10 outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`} />
                      </div>
                    </div>
                  </section>

                  {/* Actions (Slide Menu Triggers) */}
                  <section className="space-y-4">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Aesthetic Controls</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setThemeDrawerOpen(true)} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                           <div className="flex items-center gap-3">
                              <Palette className="text-blue-500" size={20} />
                              <span className="text-sm font-black">Theme</span>
                           </div>
                           <ChevronRight size={16} className="text-slate-500" />
                        </button>
                        <button onClick={() => setSkillsDrawerOpen(true)} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                           <div className="flex items-center gap-3">
                              <Code className="text-emerald-500" size={20} />
                              <span className="text-sm font-black">Stack</span>
                           </div>
                           <ChevronRight size={16} className="text-slate-500" />
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
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black transition-all active:scale-95 shadow-2xl shadow-blue-500/40"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    <span>{copied ? 'Copied' : 'Copy MD'}</span>
                  </button>
                </div>

                <div className="p-12 md:p-16 max-h-[800px] overflow-y-auto transition-all duration-700 custom-scrollbar" style={{ backgroundColor: selectedTheme.background }}>
                  <GitStatsDashboard github={profileData.github || 'Username'} name={profileData.name || 'Full Name'} location={profileData.location || 'Location'} theme={selectedTheme} />
                  
                  <div className="mt-16 pt-16 border-t border-dashed" style={{ borderColor: `${selectedTheme.secondary}33` }}>
                    <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-30" style={{ color: selectedTheme.text }}>Technologies Highlight</h3>
                    <div className="flex justify-center flex-wrap gap-4">
                       <img 
                          src={`https://skillicons.dev/icons?i=${profileData.skills.join(',')}&theme=${selectedTheme.id.includes('light') ? 'light' : 'dark'}`} 
                          alt="Skills Stack" 
                          className="max-w-full drop-shadow-2xl rounded-2xl"
                        />
                    </div>
                  </div>
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
