import '../css/registration.css'

export class Authorization {
  getHTML() {
    return `
    <section id='reg-section'>
      <div id='reg-container'>
        <h2 id='reg-title' class='reg-item'>Авторизация</h2>
        <form id='registration-form'>
          <div id='login-container' class='reg-item'>
            <p>Логин: </p>
            <input type="text" id='reg-login' name='username'>
          </div>
          <div id='login-password' class='reg-item'>
            <p>Пароль: </p>
            <input type="text" id='pas-login' name='password'>
          </div>
          <div  id='reg-btn' class='reg-item'>
            <button>Отправить</button>
          </div>
        </form>
      </div>
    </section>
    `
  }
}