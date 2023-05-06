import Sortable from 'sortablejs';
import getSavedTodoItems from '../modules/createList.js';
import checkboxCheck from '../modules/checkbox.js';
import toggleDeleteIcon from '../modules/toggleicon.js';
import './index.css';
import bars from './assets/bars-icon.svg';
import enter from './assets/enter-icon.png';

const barsImg = document.querySelector('.bars');
const enterImg = document.querySelector('.enter');

barsImg.src = bars;
enterImg.src = enter;

const todoListItem = document.querySelector('.activity');
const todoList = document.getElementsByClassName('todo-list')[0];
const clearButton = document.querySelector('.clear');
let todoItems = [];

Sortable.create(todoList, {
  animation: 150,
  ghostClass: 'blue-background-class',
  onEnd: () => {
    todoList.classList.add('sorted');

    setTimeout(() => {
      todoList.classList.remove('sorted');
    }, 1000);
  },
});

function saveTodoItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
function fixindex() {
  saveTodoItems();
  for (let i = 0; i < todoItems.length; i += 1) {
    todoItems[i].index = i + 1;
  }
}

function addTodo(todo) {
  const todolistObj = {
    description: todo,
    completed: false,
    index: todoItems.length,
  };
  todoItems.splice(1, 0, todolistObj);
  fixindex();
  saveTodoItems();
}

function editItem(label) {
  const editItem = document.querySelectorAll('.edit-item');
  label.contentEditable = true;
  label.addEventListener('blur', () => {
    for (let i = 0; i < editItem.length; i += 1) {
      todoItems[i].description = editItem[i].innerText;
    }
    saveTodoItems();
  });
}

todoItems = getSavedTodoItems();
function displayTodoItems() {
  todoList.innerHTML = '';
  for (let i = 0; i < todoItems.length; i += 1) {
    const idtask = todoItems[i].index;
    const todoItem = todoItems[i];
    const item = document.createElement('li');
    item.classList.add('list-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todoItem.completed;
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', () => {
      todoItem.completed = checkbox.checked;
      saveTodoItems();
    });
    const label = document.createElement('label');
    label.htmlFor = 'checkbox';
    label.innerText = todoItem.description;
    label.classList.add('edit-item');
    const icon = document.createElement('i');
    icon.className = 'fas fa-ellipsis-v';
    icon.classList.add('icon');
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(icon);
    item.setAttribute('data-id', idtask);
    todoList.appendChild(item);
    editItem(label);
  }
  fixindex();

  const icons = Array.from(document.querySelectorAll('.icon'));

  function toggleDeleteIcon(icon) {
    icon.classList.toggle('fa-trash-alt');
    icon.classList.toggle('fa-ellipsis-v');
  }

  icons.forEach((icon) => {
    icon.addEventListener('mouseover', () => {
      toggleDeleteIcon(icon);
    });

    icon.addEventListener('mouseout', () => {
      toggleDeleteIcon(icon);
    });
  });
}
function deleteTodoItem() {
  todoItems = todoItems.filter((item) => item.completed === false);
  saveTodoItems();
  displayTodoItems();
}
displayTodoItems();
todoListItem.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addTodo(todoListItem.value);
    todoListItem.value = '';
    event.preventDefault();
    displayTodoItems();
  }
});
clearButton.addEventListener('click', () => {
  checkboxCheck(todoItems);
  deleteTodoItem();
});

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash-alt')) {
    const itemId = parseInt(
      event.target.closest('.list-item').getAttribute('data-id'),
      10,
    );
    todoItems = todoItems.filter((item) => item.index !== itemId);
    saveTodoItems();
    displayTodoItems();
  }
});

module.exports = {
  editItem,
  toggleDeleteIcon,
  deleteTodoItem,
};
