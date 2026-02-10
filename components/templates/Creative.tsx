import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge, getVisitorCount } from './utils';

export const generateCreative = (data: ProfileData) => {
  return `<h1 align="center">✨ ${data.name} ✨</h1>
<p align="center">🌠 <i>Exploring the boundaries of ${data.title}</i> 🌠</p>

---

<table align="center" border="0">
  <tr>
    <td align="center" width="70%" valign="top">
      <br/>
      <p align="center">
        <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" />
      </p>
      <br/>
      <p align="center">
        <i>"${data.bio}"</i>
      </p>
      <br/>
      <h3>⚡ Activity Energy</h3>
      <p align="center">
        <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
      </p>
    </td>
    <td align="center" width="30%" valign="top">
      <h3>🚀 Connect</h3>
      ${getSocialLinks(data)}
      <br/>
      <h3>🌈 Palette</h3>
      ${getSkillsBadge(data.skills, 'center').replace('<p align="center">', '').replace('</p>', '')}
      <br/>
      <h3>📈 Reach</h3>
      ${getVisitorCount(data.github)}
      <br/>
      <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" />
    </td>
  </tr>
</table>

<br/>

<p align="center">
  <i>"Creativity is intelligence having fun."</i>
</p>
`.trim();
};

const CreativeTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateCreative(data)} />;
};

export default CreativeTemplate;
