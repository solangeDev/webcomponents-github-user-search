class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    const form = this.shadowRoot!.querySelector('form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.shadowRoot!.querySelector('input');
      const username = input?.value.trim();
      if (username) {
        this.dispatchEvent(new CustomEvent('search', {
          detail: { username },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        input {
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 4px;
          border: none;
          background: #0070f3;
          color: #fff;
          cursor: pointer;
        }
        button:hover {
          background: #005bb5;
        }
      </style>
      <form>
        <input type="text" placeholder="Buscar usuario de GitHub" />
        <button type="submit">Buscar</button>
      </form>
    `;
  }
}

customElements.define('search-input', SearchInput);
export default SearchInput;