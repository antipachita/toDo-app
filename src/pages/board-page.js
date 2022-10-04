import '../css/board-page.css';
import '../css/board-column.css';
import '../css/board-pop-up.css';


class BoardPage {
  getHtml(boardname, description) {
    return `
    <div id='update-background'></div>
    <div id='boards-page-container'>
      <div id='board-panel'>
        <div id='titles-container'>
          <h2 id='boards-name-title'>Название доски: ${boardname}</h2>
          <h3 id='boards-name-subtitle'>Описание доски: ${description}</h3>
        </div>
        <div id='btn-container'>
          <button id='create-column-btn'>Создать список</button>
        </div>
      </div>
      <div id='columns-container'>
        
      </div>
    </div>
    <div id='board-pop-up'>
        <div id='pop-up-container'>
          <div id='pop-up-body'>
            <h2 id='pop-up-title'>Введите название</h2>
            <form id='board-form'>
              <div id='name-container' class='popup-item'>
                <p>Название: </p>
                <input type="text" id='name-input' name='name'>
              </div>
              <div id='create-btn' class='popup-item'>
                <button id='approve-create-column-btn'>Создать</button>
              </div>
              <div id='pop-up-close'>&#10006</div>
            </form>
          </div>
        </div>
      </div>
     
    `
  }
}

export const boardPage = new BoardPage();