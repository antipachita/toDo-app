export  function createBoardField(name, description) {
  const boardField = document.createElement("div");
  boardField.classList.add('board-field');
  boardField.innerHTML = `
  
    <div class='info-field'>
      <h3 class='name-field'>${name}<h3>
      <h4 class='descrpt-field field-subtitle'>${description}<h4>
    </div>
    <div class='btn-container'>
      <button class='field-btn open-board-btn'>Открыть доску</button>
      <button class='field-btn delete-board'>Удалить доску</button>
    </div>
  
  `;
  return boardField;
}