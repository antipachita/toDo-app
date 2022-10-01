import listeners from './listeners';
import {StartPage} from '../pages/start-page';
import {Header} from '../components/header';
import {authHeader} from '../components/auth-header';
import {main} from '../pages/main';
import {boardPage} from '../pages/board-page';

export class View { 

  constructor() {
    // this.header = new Header();
    // this.main = new StartPage();
    
  }

  createPage() {
    document.querySelector('#header').innerHTML = authHeader.getHTML();
    document.querySelector('#main').innerHTML = boardPage.getHtml();
    // listeners.createSigIn();
    // listeners.createLogin();
    listeners.nav();
    listeners.ColumnBtn();
    listeners.createColumnBtn();
    
  }

  
}