import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge } from './utils';

export const generateDarkElegant = (data: ProfileData) => {
  return `<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight" />
</p>

<h1 align="center">✧ ${data.name} ✧</h1>
<p align="center"><b>${data.title}</b></p>

<p align="center">
  <i>"${data.bio}"</i>
</p>

<p align="center">
📍 ${data.location || 'Boutique Studio'} | ✉️ [Direct Inquiry](mailto:${data.email})
</p>

<br/>

<h3 align="center">◆ THE ARTISAN STACK ◆</h3>
<p align="center">
${getSkillsBadge(data.skills, 'center').replace('<p align="center">', '').replace('</p>', '')}
</p>

<br/>

<table align="center" border="0">
  <tr>
    <td align="center">
      <h3>📊 ANALYTIC SYMMETRY</h3>
      <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
    </td>
  </tr>
</table>

<p align="center">
<img src="https://streak-stats.demolab.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" />
</p>

<br/>

<p align="center">
  <b>Boutique Connectivity</b><br/>
  ${getSocialLinks(data)}
</p>

<p align="center">
  <sub>Sophisticated Professional Representation | urGit Elegance</sub>
</p>
`.trim();
};

const DarkElegantTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateDarkElegant(data)} />;
};

export default DarkElegantTemplate;
