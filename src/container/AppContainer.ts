import '../components/AppBar';
import '../components/SearchInput';
import '../components/UserCard';
import { fetchGithubUser } from '../services/githubService';

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initUserController();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #181818;
        }
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          margin-top: 5%;
        }
        .spinner {
          border: 4px solid #ccc;
          border-top: 4px solid #333;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
              </style>
      <div class="container">
        <app-bar></app-bar>
        <main>
          <search-input></search-input>
          <div id="user-card-container"></div>
        </main>
      </div>
    `;
  }

  initUserController() {
    const main = this.shadowRoot!.querySelector('main');
    const searchInput = this.shadowRoot!.querySelector('search-input');
    const cardContainer = this.shadowRoot!.querySelector('#user-card-container');
    if (!main || !searchInput || !cardContainer) return;

    let isLoading = false;
    searchInput.addEventListener('search', async (e: any) => {
      isLoading = true;
      cardContainer.innerHTML = '<div class="spinner"></div>';
      const username = e.detail.username;
      const userData = await fetchGithubUser(username);
      isLoading = false;
      cardContainer.innerHTML = '';

      if (!userData.error) {
        const userCard = document.createElement('user-card');
        userCard.setAttribute('avatar', userData.avatar_url || '');
        userCard.setAttribute('name', userData.name || userData.login || '');
        userCard.setAttribute('bio', userData.bio || '');
        userCard.setAttribute('repos', String(userData.public_repos || 0));
        userCard.setAttribute('profile', userData.html_url || '');
        cardContainer.appendChild(userCard);
      } else {

        cardContainer.innerHTML = `<p style="color: red;">Usuario no encontrado</p>`;
      }
    });

    searchInput.shadowRoot?.querySelector('input')?.addEventListener('keyup', (e: KeyboardEvent) => {
      const input = e.target as HTMLInputElement;
      if (input.value.trim() === '') {
        cardContainer.innerHTML = '';
      }
    });
  }
}

customElements.define('app-container', AppContainer);
export default AppContainer;