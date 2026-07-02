import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge, getVisitorCount } from './utils';

export const generateStatsHeavy = (data: ProfileData) => {
  return `<h1 align="center">📈 ${data.name}'s Dashboard</h1>
<p align="center">🚀 <b>${data.title}</b> 🚀</p>

<p align="center">
${data.bio}
</p>

${getVisitorCount(data.github)}

---

<table align="center">
  <tr>
    <td align="center" width="50%">
      <b>📊 Core Metrics</b><br/>
      <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
    </td>
    <td align="center" width="50%">
      <b>🔥 Daily Streak</b><br/>
      <img src="https://streak-stats.demolab.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" />
    </td>
  </tr>
</table>

### 🛠 Technology Index
<table width="100%">
  <tr>
    <td width="70%" valign="top">
      ${getSkillsBadge(data.skills, 'left')}
    </td>
    <td width="30%" valign="top">
      <b>Top Languages:</b><br/>
      <img src="https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=${data.statsTheme}&hide_border=true" />
    </td>
  </tr>
</table>

---

### 📬 Connect
<p align="center">
${getSocialLinks(data)}
</p>
`.trim();
};

const StatsHeavyTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateStatsHeavy(data)} />;
};

export default StatsHeavyTemplate;
