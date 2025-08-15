class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .appbar {
          width: 100vw;
          background: #0070f3;
          color: #fff;
          padding: 1rem 2rem;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="appbar">
        GitHub User Search
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
export default AppBar;