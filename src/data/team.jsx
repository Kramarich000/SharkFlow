import firstDeveloper from '@assets/images/reviewers/1.jpg';
import secondDeveloper from '@assets/images/reviewers/2.jpg';
import thirdDeveloper from '@assets/images/reviewers/3.jpg';
import fourthDeveloper from '@assets/images/reviewers/4.jpg';

const team = [
  {
    id: 1,
    name: 'Андрей Иванов',
    avatar: firstDeveloper,
    post: 'Frontend-разработчик',
    description:
      'Отвечает за разработку и оптимизацию пользовательского интерфейса. Опыт в React и TypeScript более 5 лет.',
  },
  {
    id: 2,
    name: 'Екатерина Смирнова',
    avatar: secondDeveloper,
    post: 'Backend-разработчик',
    description:
      'Специалист по созданию и поддержке серверной логики и баз данных. Эксперт в Node.js и PostgreSQL.',
  },
  {
    id: 3,
    name: 'Игорь Петров',
    avatar: thirdDeveloper,
    post: 'DevOps-инженер',
    description:
      'Отвечает за инфраструктуру, CI/CD и безопасность. Внедряет автоматизацию и поддерживает стабильность сервисов.',
  },
  {
    id: 4,
    name: 'Ольга Васильева',
    avatar: fourthDeveloper,
    post: 'UI/UX-дизайнер',
    description:
      'Создаёт удобные и понятные интерфейсы, улучшая пользовательский опыт. Работает над визуальной частью и прототипами.',
  },
];

export default team;
