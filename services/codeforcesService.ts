
import { CodeforcesStats } from '../types';

export const fetchCodeforcesStats = async (username: string): Promise<CodeforcesStats | null> => {
    if (!username) return null;

    try {
        const userResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        if (userData.status !== 'OK' || !userData.result?.length) throw new Error('User not found');
        const user = userData.result[0];

        // Fetch solved problems count
        const statusResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`);
        let totalSolved = 0;
        if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            if (statusData.status === 'OK') {
                const solvedSet = new Set<string>();
                statusData.result.forEach((submission: any) => {
                    if (submission.verdict === 'OK') {
                        solvedSet.add(`${submission.problem.contestId}-${submission.problem.index}`);
                    }
                });
                totalSolved = solvedSet.size;
            }
        }

        return {
            username: user.handle,
            rating: user.rating || 0,
            rank: user.rank || 'unrated',
            maxRating: user.maxRating || 0,
            maxRank: user.maxRank || 'unrated',
            totalSolved,
            contests: user.maxContribution || 0,
        };
    } catch (error) {
        console.error('Error fetching Codeforces stats:', error);
        return null;
    }
};
