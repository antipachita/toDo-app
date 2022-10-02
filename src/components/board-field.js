import {boardPage} from '../pages/board-page';
import listeners from '../js/listeners';
import {api} from '../api/api';
import {model} from '../js/model';

export  function createBoardField(name, description, id) {
  const boardField = document.createElement("div");
  boardField.classList.add('board-field');

  const infoField = document.createElement("div");
  infoField.classList.add('info-field');

  const h3 = document.createElement("h3");
  h3.classList.add('name-field');
  h3.classList.add('field-subtitle');
  h3.textContent = name;

  const h4 = document.createElement("h4");
  h4.classList.add('descrpt-field');
  h4.classList.add('field-subtitle');
  h4.textContent = description;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add('btn-container');

  const openBtn = document.createElement("button");
  openBtn.classList.add('field-btn');
  openBtn.classList.add('open-board-btn');
  openBtn.id = id;
  openBtn.textContent = 'Открыть доску';
  createOpenBoardBtnListenet(openBtn);
  
  const closeBtn = document.createElement("button");
  closeBtn.classList.add('field-btn');
  closeBtn.classList.add('open-board-btn');
  closeBtn.id = id;
  closeBtn.textContent = 'Закрыть доску';

  boardField.append(infoField, btnContainer);
  infoField.append(h3, h4);
  btnContainer.append(openBtn, closeBtn)

  
  return boardField;
}

function createOpenBoardBtnListenet(elem) {
  elem.addEventListener('click', async function (e){
    const btnId = e.currentTarget.id;
    const userInfo = await api.getUsers(model.login);
    let currentBoard;
    userInfo.boards.filter(board => {
      if (board.id === btnId) {
        currentBoard = board;
        model.currentBoard = currentBoard;
      }
    }); 
    const mainContainer = document.querySelector('#main-container');
    mainContainer.innerHTML = boardPage.getHtml();
    listeners.ColumnBtnPopUp();
    listeners.createColumnBtn();

  });
}