function checkboxCheck(todoItems) {
  const checkboxes = document.querySelectorAll('.checkbox');
  for (let i = 0; i < checkboxes.length; i += 1) {
    if (checkboxes[i].checked) {
      todoItems[i].completed = true;
    }
  }
}

export default checkboxCheck;