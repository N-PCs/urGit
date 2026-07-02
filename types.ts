
export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  portfolio: string;
  github: string;
  linkedin: string;
  twitter: string;
  reddit: string;
  stackoverflow: string;
  instagram: string;
  youtube: string;
  leetcode: string;
  codeforces: string;
  skills: string[];
  currentWork: string;
  learning: string;
  askMeAbout: string;
  statsTheme: string;
  showStats: boolean;
  showLanguageStats: boolean;
  showTrophies: boolean;
  showStreak: boolean;
}

export interface GitHubStats {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
  rating: string;
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
  topLanguages: { name: string; color: string; percentage: number }[];
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
}

export interface CodeforcesStats {
  username: string;
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
  totalSolved: number;
  contests: number;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}
