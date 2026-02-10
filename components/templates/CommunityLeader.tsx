import React from 'react';
import GithubMarkdownPreview from '../GithubMarkdownPreview';
import { ProfileData } from '../../types';
import { getSocialLinks, getSkillsBadge, getVisitorCount } from './utils';

export const generateCommunity = (data: ProfileData) => {
  return `<h1 align="center">🤝 ${data.name} | Project Hub</h1>
<p align="center">🌈 <b>${data.title}</b> | <i>Sustaining Community & Open Source</i> 🌈</p>

${getVisitorCount(data.github)}

<br/>

<p align="center">
${data.bio}
</p>

---

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      ### 🏆 Impact & Achievements
      <i>"Building for the many, sharing with all."</i>
      <br/><br/>
      <img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=${data.statsTheme}&no-frame=true&column=4" />
      <br/>
      <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" />
    </td>
    <td width="40%" valign="top">
      ### 🛠 Technical Universe
      ${getSkillsBadge(data.skills)}
      
      <br/>
      
      ### 📬 Let's Collaborate
      - 💼 **Professional:** [LinkedIn Profile](https://linkedin.com/in/${data.linkedin})
      - 🐦 **Real-time:** [Twitter/X](https://twitter.com/${data.twitter})
      - 📧 **Direct:** [Send an Email](mailto:${data.email})
    </td>
  </tr>
</table>

<br/>

### 📊 Global Contribution Metrics
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" />
</p>

<br/>

---
<p align="center">
  <sup>Open Source Evangelist | Empowered by urGit Community</sup>
</p>
`.trim();
};

const CommunityLeaderTemplate: React.FC<{ data: ProfileData }> = ({ data }) => {
  return <GithubMarkdownPreview markdown={generateCommunity(data)} />;
};

export default CommunityLeaderTemplate;
