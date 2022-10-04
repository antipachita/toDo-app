import '../css/auth-header.css'

class AuthHeader {
  getHTML() {
    return `
    <div id='logo'></div>
    <nav id='nav'>
      <ul id='ul-nav'>
        <li class='nav-link' id='nav-main-link'>Главная</li>
      </ul>
      <ul id='auth-panel-header'>
        <li class='nav-link-auth' id='log-out'>Выйти</li>
      </ul>
    </nav>
    `
  }
}

export const authHeader = new AuthHeader();