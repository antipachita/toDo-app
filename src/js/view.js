import listeners from './listeners';
import {StartPage} from '../pages/start-page';
import {Header} from '../components/header';
import {main} from '../pages/main';

export class View { 

  constructor() {
    this.header = new Header();
    // this.main = new StartPage();
    
  }

  createPage() {
    document.querySelector('#header').innerHTML = this.header.getHTML();
    document.querySelector('#main').innerHTML = main.getHTML();
    // listeners.createSigIn();
    // listeners.createLogin();
    listeners.popUp();
    listeners.createBoard();
    listeners.openBoardBtn();
  }

  
}