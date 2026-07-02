
import { LeetCodeStats } from '../types';

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats | null> => {
    if (!username) return null;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query userProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            submitStatsGlobal {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                            profile {
                                ranking
                                reputation
                            }
                        }
                        recentAcSubmissionList(username: $username, limit: 20) {
                            id
                            title
                            timestamp
                        }
                    }
                `,
                variables: { username }
            })
        });

        if (!response.ok) throw new Error('User not found');
        const data = await response.json();

        if (!data.data?.matchedUser) throw new Error('User not found');

        const user = data.data.matchedUser;
        const submissions = user.submitStatsGlobal.acSubmissionNum;

        const easy = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0;
        const medium = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0;
        const hard = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0;
        const total = submissions.find((s: any) => s.difficulty === 'All')?.count || easy + medium + hard;

        // Build submission calendar from recent submissions
        const calendar: Record<string, number> = {};
        if (data.data.recentAcSubmissionList) {
            data.data.recentAcSubmissionList.forEach((sub: any) => {
                const date = new Date(Number(sub.timestamp) * 1000).toISOString().split('T')[0];
                calendar[date] = (calendar[date] || 0) + 1;
            });
        }

        return {
            username: user.username,
            totalSolved: total,
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard,
            ranking: user.profile?.ranking || 0,
            reputation: user.profile?.reputation || 0,
            submissionCalendar: calendar,
        };
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        return null;
    }
};
