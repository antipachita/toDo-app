import  {model}  from '../js/model';
import { api } from '../api/api';
import listeners from '../js/listeners';
import {task} from './task';

class Column {
  getElement(name, id, tasks) {
    const column = document.createElement("div");
    column.classList.add('todo');
    const todoWrapper = document.createElement("div");
    todoWrapper.classList.add('todo-wrapper');
    const h4 = document.createElement("h4");
    h4.classList.add('todo-title');
    h4.textContent = name;
    const form = document.createElement("form");
    form.classList.add = 'task-form';
    const input = document.createElement("input");
    input.classList.add('todo-name');
    input.name = 'task';
    const addBtn = document.createElement("button");
    addBtn.classList.add('add-todo');
    addBtn.textContent = 'Add';
    addBtn.id = id;
    const wrapper = document.createElement("div");
    wrapper.classList.add('wrapper');
    const deleteColumn = document.createElement("div");
    deleteColumn.classList.add('del-column-btn');
    deleteColumn.textContent = 'Удалить список';
    
    
    column.append(todoWrapper);
    todoWrapper.append(h4,form, wrapper, deleteColumn);
    form.append(input, addBtn);

    form.addEventListener('click', async function(e) {
      e.preventDefault();
      if (e.target.classList.contains('add-todo')) {
        const data = new FormData(form); 
        let body = [];
          for (let entry of data.entries()){
            body.push(entry);
          }
         
          const inputValue = (Object.fromEntries(body));
          await listeners.toDo(inputValue.task, wrapper, addBtn.id);
        }
    });

    deleteColumn.addEventListener('click', async function(e) {
      column.remove();
      await api.deleteUserColumn(model.login, model.currentBoard.id, id);
    });
    

    
    return column;
  }

  getColumnsPage(name, id, tasks) {
    
    const column = document.createElement("div");
    column.classList.add('todo');
    const todoWrapper = document.createElement("div");
    todoWrapper.classList.add('todo-wrapper');
    const h4 = document.createElement("h4");
    h4.classList.add('todo-title');
    h4.textContent = name;
    const form = document.createElement("form");
    form.classList.add = 'task-form';
    const input = document.createElement("input");
    input.classList.add('todo-name');
    input.name = 'task';
    const addBtn = document.createElement("button");
    addBtn.classList.add('add-todo');
    addBtn.textContent = 'Add';
    addBtn.id = id;
    const wrapper = document.createElement("div");
    wrapper.classList.add('wrapper');
    const deleteColumn = document.createElement("div");
    deleteColumn.classList.add('del-column-btn');
    deleteColumn.textContent = 'Удалить список';

    column.append(todoWrapper);
    todoWrapper.append(h4,form, wrapper, deleteColumn);
    form.append(input, addBtn);

    form.addEventListener('click', async function(e) {
      e.preventDefault();
      if (e.target.classList.contains('add-todo')) {
        const data = new FormData(form); 
        let body = [];
          for (let entry of data.entries()){
            body.push(entry);
          }
         
          const inputValue = (Object.fromEntries(body));
          await listeners.toDo(inputValue.task, wrapper, addBtn.id);
        }
    });

    deleteColumn.addEventListener('click', async function(e) {
      column.remove();
      await api.deleteUserColumn(model.login, model.currentBoard.id, id);
    });
    
    for (let i = 0; i < tasks.length; i++) {
      task.getElement(tasks[i], wrapper, id)
    }
    
    return column;
  }
 
  
}

export const column = new Column();