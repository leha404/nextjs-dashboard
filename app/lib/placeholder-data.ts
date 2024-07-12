const todousers = [
  {
    id: 'cab26f1b-d76c-4d24-9b99-9aa10882498a',
    middle_name: 'Иванов',
    first_name: 'Иван',
    last_name: 'Иванович',
    email: 'ivanov@mail.ru',
    password: 'ivanov',
    is_manager: true,
    manager_id: null,
  },
  {
    id: '964cbfae-ba13-4749-b098-71cbdec5cfa4',
    middle_name: 'Алексеев',
    first_name: 'Алексей',
    last_name: 'Алексеевич',
    email: 'alekseev@mail.ru',
    password: 'alekseev',
    is_manager: true,
    manager_id: null,
  },
  {
    id: 'be4fcf44-c425-4ef5-9955-bd85df1d66fd',
    middle_name: 'Петров',
    first_name: 'Петр',
    last_name: 'Петрович',
    email: 'petrov@mail.ru',
    password: 'petrov',
    is_manager: false,
    manager_id: 'cab26f1b-d76c-4d24-9b99-9aa10882498a', // ivanov
  },
  {
    id: '1b0feab8-47e2-4ccd-b2c5-e90babca59f4',
    middle_name: 'Сидоров',
    first_name: 'Валентин',
    last_name: 'Валерьевич',
    email: 'sidorov@mail.ru',
    password: 'sidorov',
    is_manager: false,
    manager_id: '964cbfae-ba13-4749-b098-71cbdec5cfa4', // alekseev
  },
];

// priority: 'high' | 'mid' | 'low';
// status: 'todo' | 'progress' | 'done' | 'cancelled';
const tasks = [
  {
    name: 'Проверить ToDo app',
    description: null,
    createDate: '2024-07-11',
    updateDate: '2024-07-11',
    endDate: '2024-07-11',
    priority: 'high',
    status: 'todo',
    creator_id: 'cab26f1b-d76c-4d24-9b99-9aa10882498a', // ivanov
    responsible_user_id: 'be4fcf44-c425-4ef5-9955-bd85df1d66fd', // petrov
  },
  {
    name: 'Ответить на email',
    description: 'Валентин, проверь почту. И создай задачу в ToDoApp',
    createDate: '2024-07-11',
    updateDate: '2024-07-11',
    endDate: '2024-07-11',
    priority: 'mid',
    status: 'progress',
    creator_id: '964cbfae-ba13-4749-b098-71cbdec5cfa4', // alekseev
    responsible_user_id: '1b0feab8-47e2-4ccd-b2c5-e90babca59f4', // sidorov
  },
];

export { todousers, tasks };
