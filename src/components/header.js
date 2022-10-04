import '../css/header.css'
import '../css/media-query.css'

class Header {
  

  getHTML() {
    return `
    <div id='logo'></div>
    <nav id='nav'>
      <ul id='ul-nav'>
      </ul>
      <ul id='auth-panel'>
        <li class='nav-link' id='log-in'>Войти</li>
        <li class='nav-link' id='sign-up'>Зарегистрироваться</li>
      </ul>
    </nav>
    `
  }
}

export const header = new Header();