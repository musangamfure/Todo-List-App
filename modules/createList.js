function getSavedTodoItems() {
  const savedData = localStorage.getItem('todoItems');
  return savedData ? JSON.parse(savedData) : [];
}

export default getSavedTodoItems;