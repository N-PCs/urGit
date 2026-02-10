import { ProfileData } from '../../types';

export const getSocialLinks = (data: ProfileData) => {
    const links = [
        data.github && `<a href="https://github.com/${data.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>`,
        data.linkedin && `<a href="https://linkedin.com/in/${data.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>`,
        data.twitter && `<a href="https://twitter.com/${data.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>`,
        data.reddit && `<a href="https://reddit.com/u/${data.reddit}"><img src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" /></a>`,
        data.stackoverflow && `<a href="https://stackoverflow.com/users/${data.stackoverflow}"><img src="https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white" /></a>`,
        data.instagram && `<a href="https://instagram.com/${data.instagram}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a>`,
        data.youtube && `<a href="https://youtube.com/@${data.youtube}"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" /></a>`,
    ].filter(Boolean);
    return links.join('\n  ');
};

export const getSkillsBadge = (skills: string[], align: string = 'left') => {
    return `<p align="${align}">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=${skills.join(',')}" />\n  </a>\n</p>`;
};

export const getVisitorCount = (github: string) => {
    return `<p align="center"><img src="https://komarev.com/ghpvc/?username=${github}&label=Profile%20views&color=0e75b6&style=flat" alt="${github}" /></p>`;
};

export const getBioSection = (data: ProfileData) => {
    return `
- 🔭 I’m currently working on **${data.currentWork}**
- 🌱 I’m currently learning **${data.learning}**
- 💬 Ask me about **${data.askMeAbout}**
- 📫 How to reach me **${data.email}**`.trim();
};
