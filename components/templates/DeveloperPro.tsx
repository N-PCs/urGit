import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSkillsBadge, getVisitorCount } from './utils';

export const generateDeveloper = (data: ProfileData) => {
  return `<h1 align="center">\`whoami: ${data.name}\`</h1>
<p align="center">👨‍💻 <b>${data.title}</b> | Source Code Enthusiast 👨‍💻</p>

${getVisitorCount(data.github)}

---

### ⌨️ Environment Initialization
\`\`\`yaml
user:
  name: ${data.name}
  role: ${data.title}
  location: ${data.location}
  links:
    github: https://github.com/${data.github}
    linkedin: https://linkedin.com/in/${data.linkedin}
    portfolio: ${data.portfolio}
\`\`\`

### 🛠 System Binaries (Stack)
<p align="left">
${getSkillsBadge(data.skills)}
</p>

---

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      ### 🚀 Main Thread (Working)
      - **Active Process:** ${data.currentWork}
      - **Current Logic:** ${data.askMeAbout}
    </td>
    <td width="50%" valign="top">
      ### 🎓 Next Version (Learning)
      - **New Dependency:** ${data.learning}
      - **Roadmap:** Backend Optimization & Scale
    </td>
  </tr>
</table>

### 📊 Performance Analytics
<p align="center">
  <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
</p>
<p align="center">
  <img src="https://streak-stats.demolab.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" />
</p>
`.trim();
};

const DeveloperTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateDeveloper(data)} />;
};

export default DeveloperTemplate;
