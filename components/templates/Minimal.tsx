import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge } from './utils';

export const generateMinimal = (data: ProfileData) => {
  return `<br/>
<br/>

<h1 align="center">${data.name}</h1>
<p align="center"><b>${data.title}</b></p>

<p align="center">
  <i>${data.location ? `📍 ${data.location}` : ''}</i>
</p>

<br/>

<p align="center">
${data.bio}
</p>

<br/>
<br/>

---

<p align="center">
  <b>Connect</b>
  <br/>
  ${getSocialLinks(data)}
</p>

<br/>

<p align="center">
  <b>Toolbox</b>
  <br/>
  ${getSkillsBadge(data.skills, 'center').replace('<p align="center">', '').replace('</p>', '')}
</p>

<br/>

<p align="center">
  <img src="https://github-readme-stats-fast.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
</p>

<br/>
<br/>

<p align="center">
  <sub>"Simplicity is the ultimate sophistication."</sub>
</p>
`.trim();
};

const MinimalTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateMinimal(data)} />;
};

export default MinimalTemplate;
