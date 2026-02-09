
import { GitHubStats } from '../types';

export const fetchGitHubStats = async (username: string): Promise<GitHubStats | null> => {
    if (!username) return null;

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposResponse.ok) throw new Error('Repos not found');
        const reposData = await reposResponse.json();

        // Basic stats calculation
        let totalStars = 0;
        const languages: Record<string, { count: number; color: string }> = {};
        const languageColors: Record<string, string> = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'PHP': '#4F5D95',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
        };

        reposData.forEach((repo: any) => {
            totalStars += repo.stargazers_count;
            if (repo.language) {
                if (!languages[repo.language]) {
                    languages[repo.language] = { count: 0, color: languageColors[repo.language] || '#858585' };
                }
                languages[repo.language].count++;
            }
        });

        const topLanguages = Object.entries(languages)
            .map(([name, { count, color }]) => ({
                name,
                color,
                percentage: Math.round((count / reposData.length) * 100)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 6);

        return {
            totalStars,
            totalCommits: 0, // Requires more complex API calls or estimation
            totalPRs: 0,
            totalIssues: 0,
            contributedTo: 0,
            rating: totalStars > 100 ? 'A+' : totalStars > 50 ? 'A' : totalStars > 10 ? 'B' : 'C',
            currentStreak: 0,
            longestStreak: 0,
            totalContributions: 0,
            topLanguages
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
};
