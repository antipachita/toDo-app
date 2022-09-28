export class Main {
  getElement() {
    const main = document.createElement("main");
    main.innerHTML = this.getHTML();
    return main;
  }

  getHTML() {
    return `
    <main id='main'>
      <div id='main-container'>
      </div>
    </main>
    `
  }
}