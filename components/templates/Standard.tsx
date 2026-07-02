import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge, getVisitorCount, getBioSection } from './utils';

export const generateStandard = (data: ProfileData) => {
  return `
<h1 align="center">👋 Hello, I'm ${data.name}</h1>
<p align="center">✨ <b>${data.title}</b> ✨</p>

<p align="center">
${data.bio}
</p>

<br/>

<table align="center">
  <tr>
    <td align="center"><b>📍 Location</b></td>
    <td align="center"><b>📈 Analytics</b></td>
    <td align="center"><b>🤝 Connect</b></td>
  </tr>
  <tr>
    <td align="center">${data.location || 'Remote'}</td>
    <td align="center">${getVisitorCount(data.github).replace('<p align="center">', '').replace('</p>', '')}</td>
    <td align="center">${getSocialLinks(data)}</td>
  </tr>
</table>

---

<table align="center">
  <tr>
    <td valign="top" width="50%">
      <h3>🛠 Tech Universe</h3>
      ${getSkillsBadge(data.skills)}
    </td>
    <td valign="top" width="50%">
      <h3>🔭 Development Pipeline</h3>
      ${getBioSection(data)}
    </td>
  </tr>
</table>

<h3 align="center">📊 GitHub Powerups</h3>
<p align="center">
  <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" width="48%" />
  <img src="https://streak-stats.demolab.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" width="48%" />
</p>



<br/>
<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" />
</p>

<p align="center">
  <i>Generated with ❤️ by [urGit](https://github.com/N-PCs/urGit)</i>
</p>
`.trim();
};

const StandardTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateStandard(data)} />;
};

export default StandardTemplate;
