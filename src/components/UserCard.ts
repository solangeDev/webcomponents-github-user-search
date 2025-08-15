
class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['avatar', 'name', 'bio', 'repos', 'profile'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const avatar = this.getAttribute('avatar') || '';
    const name = this.getAttribute('name') || '';
    const bio = this.getAttribute('bio') || '';
    const repos = this.getAttribute('repos') || '0';
    const profile = this.getAttribute('profile') || '#';

    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 1rem;
          width: 320px;
          max-width: 320px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img {
          border-radius: 50%;
          width: 96px;
          height: 96px;
        }
        .name {
          font-size: 1.2rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        .bio {
          font-size: 1rem;
          color: #555;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .repos {
          font-size: 0.9rem;
          color: #333;
        }
        a {
          color: #0070f3;
          text-decoration: none;
          margin-top: 0.5rem;
        }
        /* Tablet */
        @media (max-width: 1023px) {
          .card {
            max-width: 95vw;
            padding: 1.5rem;
          }
          img {
            width: 80px;
            height: 80px;
          }
        }
        /* Mobile */
        @media (max-width: 599px) {
          .card {
            max-width: 98vw;
            padding: 1rem;
          }
          img {
            width: 64px;
            height: 64px;
          }
          .name {
            font-size: 1rem;
          }
          .bio {
            font-size: 0.9rem;
          }
        }
      </style>
      <div class="card">
        <img src="${avatar}" alt="Avatar" />
        <div class="name">${name}</div>
        <div class="bio">${bio}</div>
        <div class="repos">Repositorios públicos: ${repos}</div>
        <a href="${profile}" target="_blank">Ver perfil</a>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);
export default UserCard;