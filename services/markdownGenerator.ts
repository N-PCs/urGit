
import { ProfileData } from '../types';

export const generateMarkdown = (data: ProfileData, templateId: string): string => {
  const skillsString = data.skills.join(',');
  const statsThemeParam = data.statsTheme === 'light' ? '&theme=light' : '&theme=dark';
  
  const skillsBadge = `<p align="left">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=${skillsString}" />\n  </a>\n</p>`;

  const stats = data.showStats ? `
### 📊 GitHub Stats
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" alt="${data.github}'s stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=${data.statsTheme}&hide_border=true" alt="Top Languages" />
</p>`.trim() : '';

  const trophies = data.showTrophies ? `
### 🏆 GitHub Trophies
<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=${data.statsTheme}&no-frame=true&column=7" alt="Trophies" />
</p>`.trim() : '';

  const streak = data.showStreak ? `
### 🔥 Contribution Streak
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" alt="GitHub Streak" />
</p>`.trim() : '';

  const socialLinks = `
<p align="center">
  <a href="https://github.com/${data.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://linkedin.com/in/${data.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://twitter.com/${data.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>
</p>`.trim();

  const visitorCount = `<p align="center"><img src="https://komarev.com/ghpvc/?username=${data.github}&label=Profile%20views&color=0e75b6&style=flat" alt="${data.github}" /></p>`;

  const bioSection = `
- 🔭 I’m currently working on **${data.currentWork}**
- 🌱 I’m currently learning **${data.learning}**
- 💬 Ask me about **${data.askMeAbout}**
- 📫 How to reach me **${data.email}**`.trim();

  switch (templateId) {
    case 'minimal':
      return `# 👋 Hi, I'm ${data.name}
### ${data.title}

${data.bio}

${bioSection}

${socialLinks}

---

### 🛠 Tech Stack
${skillsBadge}

${stats}
`.trim();

    case 'stats-heavy':
      return `<h1 align="center">${data.name}</h1>
${visitorCount}

${trophies}

${stats}

${streak}

### 🛠 Tech Stack
${skillsBadge}

### 📬 Connect
- Portfolio: [${data.portfolio}](${data.portfolio})
- Email: [${data.email}](mailto:${data.email})
`.trim();

    case 'creative':
      return `<h1 align="center">✨ ${data.name}'s Creative Space ✨</h1>

<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" />
</p>

${socialLinks}

<p align="center"><i>${data.bio}</i></p>

<h2 align="center">🛠 Tech Stack</h2>
${skillsBadge.replace('<p align="left">', '<p align="center">')}

<h2 align="center">📊 Activity</h2>
${stats}
${streak}

${visitorCount}
`.trim();

    case 'compact':
      return `### 👋 I'm ${data.name} | ${data.title}
> ${data.bio}

${bioSection}

${skillsBadge}

${data.showStats ? `![Stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true&layout=compact)` : ''}
`.trim();

    case 'academic':
      return `# ${data.name}
## ${data.title}

${data.bio}

### 🔍 Research & Projects
- **Focus:** ${data.learning}
- **Current:** ${data.currentWork}

### 🛠 Technical Proficiency
${skillsBadge}

### 🔗 Networks
- [Website](${data.portfolio}) | [LinkedIn](https://linkedin.com/in/${data.linkedin})

${stats}
`.trim();

    default: // Standard Pro
      return `<h1 align="center">Hi 👋, I'm ${data.name}</h1>
<h3 align="center">${data.title}</h3>

${visitorCount}

${data.bio}

${bioSection}

### 🛠 Tech Stack
${skillsBadge}

${stats}
${streak}
${trophies}

<br/>

---
*Generated with [urGit](https://github.com/N-PCs/urGit)*
`.trim();
  }
};
