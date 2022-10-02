import listeners from '../js/listeners';

class Column {
  getElement(name) {
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
    const wrapper = document.createElement("div");
    wrapper.classList.add('wrapper');
    
    
    column.append(todoWrapper);
    todoWrapper.append(h4,form, wrapper);
    form.append(input, addBtn);

    form.addEventListener('click', function(e) {
      e.preventDefault();
      if (e.target.classList.contains('add-todo')) {
        const data = new FormData(form); 
        let body = [];
          for (let entry of data.entries()){
            body.push(entry);
          }
          const inputValue = (Object.fromEntries(body));
          listeners.toDo(inputValue.task, wrapper);
        }
    });

    return column;
  }

  getHTML(name) {
    return `
        <div class='todo-wrapper'>
          <h4 class='todo-title'>${name}</h4>
          <input type='text' class='todo-name'>
          <button class='add-todo'>Add</button>
          <div class='wrapper'>
          </div>
        </div>
    `
  }
}

export const column = new Column();