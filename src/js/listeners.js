import {View} from './view';
import {Registration} from '../pages/registration';
import {Authorization} from '../pages/authorization';
import {authHeader} from '../components/auth-header';
import {main} from '../pages/main';
import {boardPage} from '../pages/board-page';
import {column} from '../components/column';
import {api} from '../api/api';
import {createBoardField} from '../components/board-field';
import Sortable, {sortable} from '../services/Sortable';
import {model} from './model';
import { v4 as uuidv4 } from 'uuid';



  function createSigIn() {
    const signUp = document.querySelector('#sign-up');
    signUp.addEventListener('click', function() {
      const registration = new Registration();
      const mainPage = document.querySelector('#main');
      mainPage.innerHTML = registration.getHTML();
      const regForm= document.querySelector('#registration-form');
      regForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = new FormData(regForm); 
        let body = [];
        for (let entry of data.entries()){
          body.push(entry)
        
        }
        console.log(Object.fromEntries(body))
        await api.createUser(Object.fromEntries(body));
        
      });
    });
  }

  function createLogin() {
    const logIn = document.querySelector('#log-in');
    logIn.addEventListener('click', function() {
      const registration = new Authorization();
      const mainPage = document.querySelector('#main');
      mainPage.innerHTML = registration.getHTML();
      const regForm= document.querySelector('#registration-form');
      regForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = new FormData(regForm); 
        let body = [];
        for (let entry of data.entries()){
          body.push(entry);
        }
        const userInfo = await api.loginUser(Object.fromEntries(body));
        console.log(body)
        model.login = userInfo.username;
        localStorage.setItem('login', body[0][1]);
        localStorage.setItem('password', body[1][1]);
        if (userInfo) {
          const userData = await api.getUsers(model.login);
          document.querySelector('#header').innerHTML= authHeader.getHTML();
          document.querySelector('#main').innerHTML= main.getHTML();
          popUp();
          createBoard();
          mainMenuBtn();
          closeAppMenuBtn();
          const mainContainer = document.querySelector('#main-container');
          for (let i = 0; i < userData.boards.length; i++) {
            mainContainer.append(createBoardField(userData.boards[i].name, userData.boards[i].description, userData.boards[i].id))
          }
        }
      });
    });
  }

  function popUp() {
    const openPopUp = document.querySelector('#create-board-btn');
    const closePopUp = document.querySelector('#pop-up-close');
    const popUp = document.querySelector('#pop-up');
    openPopUp.addEventListener('click', function (e) {
      e.preventDefault();
      popUp.classList.add('active');
    });

    closePopUp.addEventListener('click', function (e) {
      popUp.classList.remove('active');
    }); 
  }

  function createBoard() {
    const openPopUp = document.querySelector('#approve-create-board-btn');
    openPopUp.addEventListener('click', async function (e){
      e.preventDefault();
      const mainContainer = document.querySelector('#main-container');
      const inputName = document.querySelector('#name-input');
      const inputDescrpt = document.querySelector('#descr-input');
      const uuid = uuidv4();
      if (inputName.value != ''){
        mainContainer.append(createBoardField(inputName.value, inputDescrpt.value, uuid));
        await api.updateUser(model.login, inputName.value, inputDescrpt.value, uuid);
      }
    });
  }

  function openBoardBtn() {
    const btn = document.querySelector('.open-board-btn');
    btn.addEventListener('click', async function (e){
      const mainContainer = document.querySelector('#main-container');
      mainContainer.innerHTML = boardPage.getHtml();
    });
  }

  function nav() {
    const mainBtn = document.querySelector('#nav-main-link');
    mainBtn.addEventListener('click', function(e) {
      document.querySelector('#main').innerHTML = main.getHTML();
      popUp();
      openBoardBtn();
      createBoard();
    });
  }

  async function toDo(value, wrapper, btnId) {
    if(value != '') { 
      const newTodoList = document.createElement('div');
      newTodoList.className = 'item';
      wrapper.append(newTodoList);

      const textField = document.createElement('div');
      textField.textContent = value;
      newTodoList.append(textField);
        
      const deletTodo = document.createElement('div');
      deletTodo.className = 'delete-task';
      deletTodo.innerHTML = '&#10006';
      newTodoList.append(deletTodo);

      const dropdownBlock = document.createElement('div');
      dropdownBlock.className = 'dropdown-content';

      const updateTodo = document.createElement('div');
      updateTodo.className = 'update-task';
      updateTodo.innerHTML = '&#9986';
      newTodoList.append(updateTodo);

      const updateInput = document.createElement('input');
      updateInput.className = 'dropdown-input';
      updateInput.value = value;
      dropdownBlock.append(updateInput);
      newTodoList.append(dropdownBlock);

      newTodoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('item')) {
          e.currentTarget.classList.toggle('completed');
        }
      });
      deletTodo.addEventListener('click', async function () {
        newTodoList.remove();
        await api.deleteTask(model.login, model.currentBoard.id, btnId, value)
      });

      updateTodo.addEventListener('click', function(e) {
        dropdownBlock.classList.toggle('view');
        textField.textContent = updateInput.value;
      });
  
      new Sortable(wrapper, {
        animation: 300
      });
      api.changeColumn(model.login, model.currentBoard, btnId, value)
    } 
  }

  function ColumnBtnPopUp() {
    const createBtn = document.querySelector('#create-column-btn');
    const closePopUp = document.querySelector('#pop-up-close');
    const popUp = document.querySelector('#board-pop-up');
    createBtn.addEventListener('click', function(e) {
      e.preventDefault();
      popUp.classList.add('active');
    });
    closePopUp.addEventListener('click', function(e) {
      e.preventDefault();
      popUp.classList.remove('active');
    });
  }

  function createColumnBtn() {
    const btn = document.querySelector('#approve-create-column-btn');
    btn.addEventListener('click', async function (e){
      e.preventDefault();
      const columnsContainer = document.querySelector('#columns-container');
      const columnName = document.querySelector('#name-input');
      const uuid = uuidv4();
      columnsContainer.append(column.getElement(columnName.value, uuid));
      await api.createColumn(model.login, model.currentBoard, columnName.value, uuid);
    });
  }

  function mainMenuBtn() {
    const mainMenuBtn = document.querySelector('#nav-main-link');
    mainMenuBtn.addEventListener('click', async function(e) {
      const userData = await api.getUsers(model.login);
      document.querySelector('#main').innerHTML= main.getHTML();
      popUp();
      createBoard();
          
      const mainContainer = document.querySelector('#main-container');
      for (let i = 0; i < userData.boards.length; i++) {
        mainContainer.append(createBoardField(userData.boards[i].name, userData.boards[i].description, userData.boards[i].id))
      }
    });

   
  }

  function closeAppMenuBtn() {
    const closeAppBtn = document.querySelector('#log-out');
    closeAppBtn.addEventListener('click', function(e) {
      const app = new View();
      localStorage.clear();
      app.createPage();
    });
  }

export default {createSigIn, createLogin, popUp, createBoard, openBoardBtn, nav, toDo, ColumnBtnPopUp, createColumnBtn, mainMenuBtn, closeAppMenuBtn };