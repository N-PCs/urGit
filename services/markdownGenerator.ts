import { ProfileData } from '../types';
import { generateStandard } from '../components/templates/Standard';
import { generateMinimal } from '../components/templates/Minimal';
import { generateStatsHeavy } from '../components/templates/StatsHeavy';
import { generateCreative } from '../components/templates/Creative';
import { generateCompact } from '../components/templates/Compact';
import { generateAcademic } from '../components/templates/Academic';
import { generateDeveloper } from '../components/templates/DeveloperPro';
import { generateDarkElegant } from '../components/templates/DarkElegant';
import { generateCommunity } from '../components/templates/CommunityLeader';

export const generateMarkdown = (data: ProfileData, templateId: string): string => {
  switch (templateId) {
    case 'minimal':
      return generateMinimal(data);
    case 'stats-heavy':
      return generateStatsHeavy(data);
    case 'creative':
      return generateCreative(data);
    case 'compact':
      return generateCompact(data);
    case 'academic':
      return generateAcademic(data);
    case 'developer-focused':
      return generateDeveloper(data);
    case 'dark-elegant':
      return generateDarkElegant(data);
    case 'community-leader':
      return generateCommunity(data);
    default:
      return generateStandard(data);
  }
};
