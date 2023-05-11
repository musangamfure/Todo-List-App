let todoItems = [];

const addTodo = (todo) => {
  const todolistObj = {
    description: todo,
    completed: false,
    index: todoItems.length,
  };
  todoItems.push(todolistObj);
};

const deleteTodoItem = () => {
  todoItems = todoItems.filter((item) => item.completed === false);
};

describe('Todo List', () => {
  beforeEach(() => {
    todoItems = [];
  });
  describe('addTodo', () => {
    it('should add a todo to the list', () => {
      addTodo('Test todo');
      expect(todoItems.length).toEqual(1);
      expect(todoItems[0].description).toEqual('Test todo');
      expect(todoItems[0].completed).toBeFalsy();
      expect(todoItems[0].index).toEqual(0);
    });
    it('should add multiple todos to the list', () => {
      addTodo('Test todo 1');
      addTodo('Test todo 2');
      addTodo('Test todo 3');
      expect(todoItems.length).toEqual(3);
      expect(todoItems[0].description).toEqual('Test todo 1');
      expect(todoItems[1].description).toEqual('Test todo 2');
      expect(todoItems[2].description).toEqual('Test todo 3');
    });
  });
  describe('deleteTodoItem', () => {
    it('should delete a completed todo from the list', () => {
      addTodo('Test todo 1');
      addTodo('Test todo 2');
      addTodo('Test todo 3');
      todoItems[1].completed = true;
      deleteTodoItem();
      expect(todoItems.length).toEqual(2);
      expect(todoItems[0].description).toEqual('Test todo 1');
      expect(todoItems[1].description).toEqual('Test todo 3');
    });
    it('should not delete any todos if none are completed', () => {
      addTodo('Test todo 1');
      addTodo('Test todo 2');
      addTodo('Test todo 3');
      deleteTodoItem();
      expect(todoItems.length).toEqual(3);
      expect(todoItems[0].description).toEqual('Test todo 1');
      expect(todoItems[1].description).toEqual('Test todo 2');
      expect(todoItems[2].description).toEqual('Test todo 3');
    });
    it('should not delete any todos if there are no todos', () => {
      deleteTodoItem();
      expect(todoItems.length).toEqual(0);
    });
  });
});
