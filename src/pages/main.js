import '../css/main-page.css';
import '../css/pop-up.css';
import '../css/board-field.css';


class MainPage {

  getHTML() {
    return `
      <div id='main-container'>
        <h2 id='main-title'>Главная странциа</h2>
        <button id='create-board-btn'>Создать доску</button>
        <div class='board-field'>
          <div class='info-field'>
            <h3 class='name-field'>Board<h3>
            <h4 class='descrpt-field field-subtitle'>Board<h4>
          </div>
          <div class='btn-container'>
            <button class='field-btn open-board-btn'>Открыть доску</button>
            <button class='field-btn delete-board'>Удалить доску</button>
          </div>
        </div>
        
      </div>
      <div id='pop-up'>
        <div id='pop-up-container'>
          <div id='pop-up-body'>
            <h2 id='pop-up-title'>Параметры созданной доски</h2>
            <form id='board-form'>
              <div id='name-container' class='popup-item'>
                <p>Название: </p>
                <input type="text" id='name-input' name='name'>
              </div>
              <div id='description-container' class='popup-item'>
                <p>Описание: </p>
                <input type="text" id='descr-input' name='description'>
              </div>
              <div id='create-btn' class='popup-item'>
                <button id='approve-create-board-btn'>Создать</button>
              </div>
              <div id='pop-up-close'>&#10006</div>
            </form>
          </div>
        </div>
      </div>
    `
  }
}

export const main = new MainPage();