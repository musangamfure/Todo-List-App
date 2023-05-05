import './styles/main.css';

import bars from './assets/bars-icon.svg';
import enter from './assets/enter-icon.png';
import refresh from './assets/refresh-icon.png';

const barsImg = document.querySelector('.bars');
const enterImg = document.querySelector('.enter');
const refreshImg = document.querySelector('.refresh');

barsImg.src = bars;
enterImg.src = enter;
refreshImg.src = refresh;

const tasklist = [
  {
    description: 'Renew gym membership',
    completed: false,
    index: 0,
  },
  {
    description: 'Write 100 lines of code',
    completed: false,
    index: 1,
  },
];

const loadTasks = () => {
  const tasks = document.querySelector('.tasks');
  tasklist.forEach((task) => {
    const containertask = document.createElement('div');
    const tasklabel = document.createElement('label');
    const taskinput = document.createElement('input');
    containertask.setAttribute('class', 'task-container');
    tasklabel.setAttribute('class', 'currenttask');
    taskinput.setAttribute('type', 'checkbox');
    taskinput.checked = task.completed;
    tasklabel.appendChild(taskinput);
    tasklabel.appendChild(document.createTextNode(task.description));
    containertask.appendChild(tasklabel);
    tasks.appendChild(containertask);
  });
};

const onPageLoad = () => {
  loadTasks();
};

window.onload = onPageLoad();
