import '../css/header.css'

export class Header {
  

  getHTML() {
    return `
    <div id='logo'></div>
    <nav id='nav'>
      <ul id='ul-nav'>
        <li class='nav-link >Главная</li>
        <li class='nav-link'>Команда</li>
      </ul>
      <ul id='auth-panel'>
        <li class='nav-link' id='log-in'>Войти</li>
        <li class='nav-link' id='sign-up'>Зарегистрироваться</li>
      </ul>
    </nav>
    `
  }
}