import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge } from './utils';

export const generateCompact = (data: ProfileData) => {
  return `<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <h2>📦 ${data.name}</h2>
      <code>${data.title}</code>
      <p>${data.bio}</p>
    </td>
    <td width="40%" align="right" valign="top">
       ${getSocialLinks(data)}
       <br/>
       <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true&layout=compact" width="200" />
    </td>
  </tr>
</table>

---

<table width="100%">
  <tr>
    <td width="70%" valign="top">
      <b>🛠 Technical Arsenal</b><br/>
      ${getSkillsBadge(data.skills, 'left')}
    </td>
    <td width="30%" align="right" valign="top">
      <b>🔥 Activity Pulse</b><br/>
      <img src="https://streak-stats.demolab.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" width="180" />
    </td>
  </tr>
</table>

<p align="center">
  <sub>Everything you need, in one glance.</sub>
</p>
`.trim();
};

const CompactTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateCompact(data)} />;
};

export default CompactTemplate;
