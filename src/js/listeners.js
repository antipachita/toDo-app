import {View} from './view';
import {Registration} from '../pages/registration';
import {Authorization} from '../pages/authorization';
import {authHeader} from '../components/auth-header';
import {main} from '../pages/main';
import {api} from '../api/api';
import {createBoardField} from '../components/board-field';


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
        const token = await api.loginUser(Object.fromEntries(body));
        if (token) {
          document.querySelector('#header').innerHTML= authHeader.getHTML();
          document.querySelector('#main').innerHTML= main.getHTML();
          popUp();
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
    openPopUp.addEventListener('click', function (e){
      e.preventDefault();
      const mainContainer = document.querySelector('#main-container');
      const inputName = document.querySelector('#name-input');
      const inputDescrpt = document.querySelector('#descr-input');
      mainContainer.append(createBoardField(inputName.value, inputDescrpt.value));
    });
  }

  function openBoardBtn() {
    const btn = document.querySelector('.open-board-btn');
    btn.addEventListener('click', function (e){
      const mainContainer = document.querySelector('#main-container');
      mainContainer.innerHTML = '';
    });
  }



export default {createSigIn, createLogin, popUp, createBoard, openBoardBtn};