import '../css/header.css'

export class Header {
  getElement() {
    const header = document.createElement("header");
    header.innerHTML = this.getHTML();
    return header
  }

  getHTML() {
    return `
    <div id='logo'></div>
    <nav id='nav'>
      <ul id='ul-nav'>
        <li class='nav-link'>Главная</li>
        <li class='nav-link'>Команда</li>
      </ul>
      <ul id='auth-panel'>
        <li class='nav-link'>Войти</li>
        <li class='nav-link'>Зарегистрироваться</li>
      </ul>
    </nav>
    `
  }
}