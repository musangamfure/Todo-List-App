let todoArray = [];
const todo = {
  description: String,
  completed: false,
};
const inputField = document.createElement('input');
inputField.value = 'one';

const addTodo = () => {
  if (inputField.value.length !== 0) {
    todo.description = inputField.value;
    todoArray.push(todo);
    for (let i = 0; i < todoArray.length; i += 1) {
      todoArray[i].index = i + 1;
    }
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }
};

const editTodo = (id, newInput) => {
  const item = todoArray.find((item) => item.index === id);
  if (inputField.value.length !== 0) {
    item.description = newInput;
  }

  localStorage.setItem('todos', JSON.stringify(todoArray));
};

const updateTodoStatus = (id) => {
  const checked = todoArray.find((item) => item.index === id);
  if (checked.completed === false) {
    checked.completed = true;
    localStorage.setItem('todos', JSON.stringify(todoArray));
  } else if (checked.completed === true) {
    checked.completed = false;
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }
};

const clearAll = () => {
  const checkedTodos = todoArray.filter((item) => item.completed === false);
  todoArray = checkedTodos;
  localStorage.setItem('todos', JSON.stringify(todoArray));
  return todoArray;
};

describe('todo', () => {
  test('add a todo to todo array', () => {
    addTodo();
    expect(todoArray.length).toBe(1);
  });
  test('should check edit todo description with value of two', () => {
    editTodo(1, 'two');
    expect(todoArray[0].description).toBe('two');
  });
  test('should check if completed status is updtaded', () => {
    updateTodoStatus(1);
    expect(todoArray[0].completed).toBe(true);
  });
  test('Should clear all completed todos', () => {
    updateTodoStatus(1);
    clearAll();
    for (let i = 0; i < todoArray.length; i += 1) {
      expect(todoArray[i].completed).toBe(false);
    }
  });
});
