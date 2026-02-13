import { useState, useEffect } from 'react';
import { ProfileData } from '../types';
import { INITIAL_PROFILE_DATA } from '../constants';

export const useProfile = () => {
    const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE_DATA);

    useEffect(() => {
        const savedData = localStorage.getItem('urgit_profile_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setProfileData(parsed);
            } catch (e) {
                console.error('Failed to parse saved profile data', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('urgit_profile_data', JSON.stringify(profileData));
    }, [profileData]);

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

    return {
        profileData,
        setProfileData,
        updateProfile,
        toggleSkill
    };
};
