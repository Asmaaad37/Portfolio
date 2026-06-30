import dayjs from 'dayjs';

import { StatData } from '../../components/Stats/types';

/* Keys match keys returned by the github api. Fields without keys are
 * mostly jokes. To see everything returned by the github api, run:
 curl https://api.github.com/repos/Asmaaad37/Portfolio
 */
const data: StatData[] = [
  {
    label: 'Stars this repository has on github',
    key: 'stargazers_count',
    link: 'https://github.com/Asmaaad37/Portfolio/stargazers',
  },
  {
    label: 'Number of people watching this repository',
    key: 'subscribers_count',
    link: 'https://github.com/Asmaaad37/Portfolio/stargazers',
  },
  {
    label: 'Number of forks',
    key: 'forks',
    link: 'https://github.com/Asmaaad37/Portfolio/network',
  },
  {
    label: 'Number of linter warnings',
    value: '0',
  },
  {
    label: 'Open github issues',
    key: 'open_issues_count',
    link: 'https://github.com/Asmaaad37/Portfolio/issues',
  },
  {
    label: 'Last updated at',
    key: 'pushed_at',
    link: 'https://github.com/Asmaaad37/Portfolio/commits',
    format: (x: unknown) => dayjs(x as string).format('MMMM DD, YYYY'),
  },
];

export default data;
