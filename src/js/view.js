import listeners from './listeners';
import {startPage} from '../pages/start-page';
import {header} from '../components/header';
import {authHeader} from '../components/auth-header';
import {main} from '../pages/main';
import {model} from './model';
import {api} from '../api/api';
import {createBoardField} from '../components/board-field';


export class View { 

  constructor() {
 
  }

  async createPage() {
    if (!localStorage.getItem('login') && !localStorage.getItem('password')){
      document.querySelector('#header').innerHTML = header.getHTML();
      document.querySelector('#main').innerHTML = startPage.getHTML();
      listeners.createSigIn();
      listeners.createLogin();
    } else {
      model.login = localStorage.getItem('login');
      const userData = await api.getUsers(model.login);
      document.querySelector('#header').innerHTML= authHeader.getHTML();
      document.querySelector('#main').innerHTML= main.getHTML();
      listeners.popUp();
      listeners.createBoard();
      listeners.mainMenuBtn();
      listeners.closeAppMenuBtn();
      const mainContainer = document.querySelector('#main-container');
      for (let i = 0; i < userData.boards.length; i++) {
        mainContainer.append(createBoardField(userData.boards[i].name, userData.boards[i].description, userData.boards[i].id))
      }
    }
  }

  
}