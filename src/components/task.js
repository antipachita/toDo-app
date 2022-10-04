import {api} from '../api/api';
import Sortable, {sortable} from '../services/Sortable';
import  {model}  from '../js/model';

class Task {
  getElement(name, wrapper, id) {
    const newTodoList = document.createElement('div');
    newTodoList.className = 'item';
    wrapper.append(newTodoList);

    const textField = document.createElement('div');
    textField.textContent = name;
    newTodoList.append(textField);

    const deletTodo = document.createElement('div');
    deletTodo.className = 'delete-task';
    deletTodo.innerHTML = '&#10006';
    newTodoList.append(deletTodo);

    const updateTodo = document.createElement('div');
    updateTodo.className = 'update-task';
    updateTodo.innerHTML = '&#9986';
    newTodoList.append(updateTodo);

    const dropdownBlock = document.createElement('div');
    dropdownBlock.className = 'dropdown-content';

    const updateInput = document.createElement('input');
    updateInput.className = 'dropdown-input';
    updateInput.value = name;
    dropdownBlock.append(updateInput);
    newTodoList.append(dropdownBlock);

    newTodoList.addEventListener('click', function (e) {
      if (e.target.classList.contains('item')) {
        e.currentTarget.classList.toggle('completed');
      }
    });

    deletTodo.addEventListener('click', async function () {
      newTodoList.remove();
      await api.deleteTask(model.login, model.currentBoard.id, id, name);
    });

    updateTodo.addEventListener('click', function(e) {
      dropdownBlock.classList.toggle('view');
      textField.textContent = updateInput.value;
      if (e.target.classList.contains('changing')) {
        console.log(1);
      }
      updateTodo.classList.toggle('changing');

    });

    new Sortable(wrapper, {
      animation: 300
    });
  }



  
}

export const task = new Task();