import listeners from './listeners';
import {startPage} from '../pages/start-page';
import {header} from '../components/header';
import {authHeader} from '../components/auth-header';
import {main} from '../pages/main';
import {boardPage} from '../pages/board-page';

export class View { 

  constructor() {
    // this.header = new Header();
    // this.main = new StartPage();
    
  }

  createPage() {
    document.querySelector('#header').innerHTML = header.getHTML();
    document.querySelector('#main').innerHTML = startPage.getHTML();
    listeners.createSigIn();
    listeners.createLogin();
   
    
  }

  
}