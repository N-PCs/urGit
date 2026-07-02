import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSkillsBadge } from './utils';

export const generateAcademic = (data: ProfileData) => {
  return `<h1 align="center">${data.name}</h1>
<p align="center">🏛 <b>${data.title}</b> | 📍 <i>${data.location}</i></p>

---

### 📝 Abstract
${data.bio}

<br/>

### 🔍 Research Domains & Active Focus
- **Current Investigation:** ${data.learning}
- **Project Repository:** ${data.currentWork}
- **Subject Expertise:** ${data.askMeAbout}

<br/>

### 🛠 Methodologies & Technical Stack
<table width="100%">
  <tr>
    <td width="60%" valign="top">
      ${getSkillsBadge(data.skills)}
    </td>
    <td width="40%" valign="top">
      <b>Digital Presence Index:</b>
      <ul>
        <li>Portfolio: [View Work](${data.portfolio})</li>
        <li>LinkedIn: [Profile Citation](https://linkedin.com/in/${data.linkedin})</li>
        <li>GitHub: [Source Control](https://github.com/${data.github})</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

### 📊 Citation Metrics (GitHub Stats)
<p align="center">
  <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
</p>

<br/>

<p align="center">
  <sub>Formal Professional Profile | Generated with urGit</sub>
</p>
`.trim();
};

const AcademicTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateAcademic(data)} />;
};

export default AcademicTemplate;
