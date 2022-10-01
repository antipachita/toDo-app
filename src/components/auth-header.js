import '../css/auth-header.css'

class AuthHeader {
  getHTML() {
    return `
    <div id='logo'></div>
    <nav id='nav'>
      <ul id='ul-nav'>
        <li class='nav-link' id='nav-main-link'>Главная</li>
        <li class='nav-link'>Профиль</li>
      </ul>
      <ul id='auth-panel'>
        <li class='nav-link' id='log-in'><nobr>Изменить тему</nobr></li>
      </ul>
    </nav>
    `
  }
}

export const authHeader = new AuthHeader();